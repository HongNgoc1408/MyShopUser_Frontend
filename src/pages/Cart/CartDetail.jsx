import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Radio,
  Select,
  Skeleton,
  Steps,
  Table,
} from "antd";
import CartService from "../../services/CartService";
import {
  formatVND,
  showError,
  toImageLink,
} from "../../services/commonService";
import { DeleteOutlined } from "@ant-design/icons";
import AddressService from "../../services/AddressService";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import TextArea from "antd/es/input/TextArea";
import UserService from "../../services/UserService";
import { CiLocationOn } from "react-icons/ci";
import OrderService from "../../services/OrderService";
import { Link, useNavigate } from "react-router-dom";
import debounce from "debounce";
import { CountContext } from "../../App";
import PaymentsService from "../../services/PaymentsService";

const breadcrumb = [
  {
    path: "/",
    title: "Trang chủ",
  },
  {
    title: "Giỏ hàng",
  },
];
const CartDetail = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [approximatePrice, setApproximatePrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [dataAddress, setDataAddress] = useState({});
  const [payment, setPayment] = useState([]);
  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [wards, setWard] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const { setCount } = useContext(CountContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await CartService.getAllByUserId();
        const address = await UserService.getAddress();
        const result = await AddressService.getProvince();
        const payment = await PaymentsService.getAll();

        console.log("res", payment.data);

        setData(res.data);
        setDataAddress(address.data);
        setProvince(result.data.data || []);
        setPayment(payment.data);
      } catch (error) {
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const showModal = () => {
    // console.log("showModal", dataAddress);
    form.setFieldsValue(dataAddress);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProvinceChange = async (value, option) => {
    // console.log("handleProvinceChange", value);
    setSelectedProvince(value);
    try {
      const res = await AddressService.getDistrictsProvince(value);
      setDistrict(res.data.data ?? []);
      setWard([]);

      form.setFieldsValue({
        province_id: value,
        province_name: option.label,
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleDistrictChange = async (value, option) => {
    // console.log("handleDistrictChange", value);
    setSelectedDistrict(value);
    try {
      const res = await AddressService.getWardsProvince(value);
      setWard(res.data.data ?? []);

      form.setFieldsValue({
        district_id: value,
        district_name: option.label,
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleWardChange = (value, option) => {
    // console.log("handleWardChange", value);
    form.setFieldsValue({
      ward_id: value,
      ward_name: option.label,
    });
  };

  const handleOk = async () => {
    setLoadingUpdate(true);
    try {
      const value = await form.validateFields();
      // console.log("handleOk", value);
      await UserService.updateAddress(value);

      notification.success({
        message: "Cập nhật địa chỉ thành công.",
        placement: "top",
      });

      setIsModalOpen(false);
      setDataAddress(value);
    } catch (error) {
      showError(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const onChange = (e) => {
    // console.log("Radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleDeleteProduct = async (cartId) => {
    try {
      if (selectedRowKeys.length === 0) {
        notification.warning({
          message: "Vui lòng chọn sản phẩm cần xóa",
          placement: "top",
        });
        return;
      }
      await CartService.remove(cartId);

      notification.success({ message: "Xóa thành công.", placement: "top" });

      setTimeout(() => {
        window.location.reload();
      }, 500);

      setSelectedRowKeys([]);
    } catch (error) {
      showError(error);
    }
  };

  const handleDeleteSelectedProducts = async () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: "Vui lòng chọn sản phẩm cần xóa",
        placement: "top",
      });
      return;
    }

    try {
      const selectedItems = data.filter((item) =>
        selectedRowKeys.includes(item.id)
      );

      const selectedProductIds = selectedItems.map((item) => item.productId);

      // console.log(selectedProductIds);

      await CartService.removeAll(selectedProductIds);
      notification.success({
        message: "Xóa sản phẩm thành công",
        placement: "top",
      });

      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);

      const newData = data.filter(
        (item) => !selectedRowKeys.includes(item.productId)
      );
      setCount(newData.map((item) => item.productId));
      setData(newData);

      setSelectedRowKeys([]);
    } catch (error) {
      notification.error({
        message: "Xóa sản phẩm thất bại",
        placement: "top",
        description: error.message,
      });
    }
  };

  const debounceUpdateCartItem = debounce(async (id, updatedData) => {
    try {
      await CartService.update(id, updatedData);

      const res = await CartService.getAllByUserId();
      setData(res.data);
    } catch (error) {
      showError(error);
    }
  }, 500);

  const handleQuantityChange = (value, record) => {
    const updatedItem = {
      ...record,
      quantity: value,
    };

    debounceUpdateCartItem(record.id, updatedItem);

    const updatedData = data.map((item) =>
      item.id === record.id ? { ...item, quantity: value } : item
    );
    updateApproximatePriceAndShippingFee(updatedData);
  };

  const handleSizeChange = (value, record) => {
    const updatedItem = {
      ...record,
      sizeId: value,
      sizeName: record.sizeInStocks.find((size) => size.sizeId === value)
        ?.sizeName,
    };

    debounceUpdateCartItem(record.id, updatedItem);

    const updatedData = data.map((item) =>
      item.id === record.id ? { ...item, sizeId: value } : item
    );

    updateApproximatePriceAndShippingFee(updatedData);
  };

  const updateApproximatePriceAndShippingFee = (updatedData) => {
    const selectedItems = updatedData.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const approximate = selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setApproximatePrice(approximate);
    totalShippingFee(approximate);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);

      const selectedItems = data.filter((item) =>
        newSelectedRowKeys.includes(item.id)
      );

      // const selectedProductIds = selectedItems.map((item) => item.productId);
      // console.log("Selected Product IDs:", selectedItems);

      const approximate = selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setApproximatePrice(approximate);
      totalShippingFee(approximate);
    },
  };

  const totalShippingFee = (approximate) => {
    if (approximate < 200000) {
      setShippingFee(30000);
      setCurrentStep(1);
    } else if (approximate >= 200000 && approximate < 500000) {
      setShippingFee(20000);
      setCurrentStep(2);
    } else {
      setShippingFee(0);
      setCurrentStep(3);
    }
  };

  const handleAddOrder = async () => {
    try {
      const hasEmptyField =
        !dataAddress || Object.values(dataAddress).some((value) => !value);

      if (hasEmptyField) {
        notification.error({
          message: "Thông tin đơn hàng không được để trống",
          placement: "top",
        });
        return;
      }

      if (selectedRowKeys.length === 0) {
        notification.warning({
          message: "Vui lòng chọn sản phẩm muốn mua",
          placement: "top",
        });
        return;
      }
      // console.log(value);

      if (value) {
        const order = {
          total: approximatePrice + shippingFee,
          shippingCost: shippingFee,
          receiver: `${dataAddress.name} - ${dataAddress.phoneNumber}`,
          deliveryAddress: `${dataAddress.detail}, ${dataAddress.ward_name}, ${dataAddress.district_name}, ${dataAddress.province_name}`,
          cartIds: selectedRowKeys.map(String),
          paymentMethodId: value,
          district_Id: dataAddress.district_id,
          ward_Id: `${dataAddress.ward_id}`,
        };

        // console.log(data);

        const res = await OrderService.add(order);

        console.log(order);

        if (order.paymentMethodId !== 1) {
          window.location.replace(res.data);
        } else {
          message.success("Đặt hàng thành công.");
          navigate("/order");
        }
      } else {
        message.error("Vui lòng chọn phương thức thanh toán");
      }
    } catch (error) {
      notification.error({
        message: "Đặt hàng thất bại",
        placement: "top",
        description: showError(error),
      });
    }
  };

  const columns = [
    {
      dataIndex: "imageUrl",
      align: "center",
      render: (imageUrl, record) => (
        <div className="flex items-center">
          <Image
            width={100}
            height={120}
            src={toImageLink(imageUrl)}
            alt={record.productName}
          />
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      render: (_, record) => (
        <Link to={`/product-details/${record.productId}`}>
          <span className="text-base capitalize ml-4 md:truncate md:w-96 truncate w-40">
            {record.productName}
          </span>
        </Link>
      ),
    },

    {
      title: "Màu sắc",
      dataIndex: "colorName",
      render: (_, record) => (
        <span className="text-base ml-4 md:truncate md:w-96 truncate w-40">
          {record.colorName}
        </span>
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "sizeName",
      render: (value, record) => {
        const sizeOptions = record.sizeInStocks.map((size) => ({
          label: size.sizeName,
          value: size.sizeId,
        }));

        return (
          <Select
            defaultValue={record.sizeId}
            onChange={(value) => handleSizeChange(value, record)}
            options={sizeOptions}
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
      render: (_, record) => (
        <>
          <span className="price-card-product text-gray-500 line-through">
            {record.originPrice !== record.price
              ? formatVND(record.originPrice)
              : ""}
          </span>
          <span className="price-card-product">{formatVND(record.price)}</span>
        </>
      ),
    },
    {
      title: "Số lượng",
      align: "center",
      dataIndex: "quantity",
      render: (value, record) => {
        const currentSize = record.sizeInStocks.find(
          (size) => size.sizeId === record.sizeId
        );
        const maxQuantity = currentSize ? currentSize.inStock : 0;
        return (
          <InputNumber
            min={1}
            max={maxQuantity}
            className="cursor-pointer"
            value={value}
            onChange={(newValue) => handleQuantityChange(newValue, record)}
          />
        );
      },
    },
    {
      title: "Số tiền",
      align: "center",
      key: "total",
      render: (_, record) => {
        const total = record.price * record.quantity;
        return <span className="price-card-product">{formatVND(total)}</span>;
      },
    },
    {
      title: (
        <Button
          danger
          className="border-0 flex items-center"
          onClick={handleDeleteSelectedProducts}
        >
          <DeleteOutlined />
        </Button>
      ),
      align: "center",
      render: (text, record) => (
        <Button
          danger
          className="border-0 flex items-center"
          onClick={() => handleDeleteProduct(record.id)}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="bg-gray-100">
        {isLoading ? (
          <Skeleton paragraph={{ rows: 15 }} />
        ) : (
          <>
            <div className="container mx-20">
              <BreadcrumbLink breadcrumb={breadcrumb} />
            </div>

            <div className="flex md:flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
              <div className="container mx-auto max-lg:px-8 pl-20 pr-10 w-full lg:w-2/3 md:w-full sm:w-full">
                <div className="my-5 p-5 bg-white shadow-md text-base">
                  <Steps initial={0} current={currentStep}>
                    <Steps.Step
                      className="text-base"
                      title={formatVND(30000)}
                      description={"dưới " + formatVND(200000)}
                    />
                    <Steps.Step
                      className="text-base"
                      title={formatVND(20000)}
                      description={
                        "từ " +
                        formatVND(200000) +
                        "đến dưới " +
                        formatVND(500000)
                      }
                    />
                    <Steps.Step
                      className="text-base"
                      title="Miễn phí"
                      description={"trên " + formatVND(500000)}
                    />
                  </Steps>
                </div>

                <div className="my-5 p-5 bg-white shadow-md">
                  <ConfigProvider
                    theme={{
                      components: {
                        Table: {
                          cellFontSize: 16,
                        },
                      },
                      token: {
                        fontSize: 16,
                      },
                    }}
                  >
                    <Table
                      rowSelection={rowSelection}
                      pagination={false}
                      loading={isLoading}
                      columns={columns}
                      dataSource={data}
                      rowKey={(record) => record.id}
                      className="overflow-x-auto"
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div className="container mx-auto max-lg:px-8 pr-20 w-full lg:w-1/3 md:w-full sm:w-full ">
                <Card className="text-base my-5 p-5 bg-white shadow-md rounded-none">
                  <div className="space-x-2">
                    <div className="flex-col flex">
                      <div className="flex justify-between">
                        <div className="flex space-x-1 py-2">
                          <CiLocationOn className="text-xl text-orange-600" />
                          <span className="font-bold">
                            {dataAddress.name} - {dataAddress.phoneNumber}
                          </span>
                        </div>
                        <span
                          onClick={showModal}
                          className="text-blue-500 cursor-pointer hover:text-orange-600 py-2"
                        >
                          Thay đổi
                        </span>
                      </div>
                      <div className="flex space-x-1 py-2">
                        <span className="truncate w-80 lg:w-80 md:w-full">
                          {dataAddress.detail} - {dataAddress.ward_name} -{" "}
                          {dataAddress.district_name} -{" "}
                          {dataAddress.province_name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Divider className="my-[0.8rem]" />
                  <div className="flex justify-between py-2">
                    <div>Tạm tính</div>
                    <div>{formatVND(approximatePrice)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Phí giao hàng</div>
                    <div>{formatVND(shippingFee)}</div>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <div>Tổng tiền</div>
                    <div className="text-xl font-bold text-red-600">
                      {formatVND(approximatePrice + shippingFee)}
                    </div>
                  </div>
                </Card>
                <Card className="rounded-sm" title="Thanh toán">
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className="flex flex-col space-y-3"
                  >
                    {payment.map((paymentOption) => (
                      <Radio
                        key={paymentOption.id}
                        value={paymentOption.id}
                        required
                      >
                        <div className="flex space-x-4 items-center">
                          <span>{paymentOption.name}</span>
                        </div>
                      </Radio>
                    ))}
                  </Radio.Group>
                </Card>
                <Divider className="my-[0.1rem] border-0" />
                <div className="w-full text-left my-4">
                  <button
                    onClick={() => handleAddOrder()}
                    className="default-button border-2 text-base flex justify-center items-center gap-2 w-full py-5 px-4 font-bold rounded-md lg:m-0 md:px-6"
                  >
                    <span className="relative z-10">Mua ngay</span>
                  </button>
                </div>
              </div>
              <Modal
                title="Địa chỉ giao hàng"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                loading={loadingUpdate}
              >
                <Form form={form} layout="vertical">
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[
                      {
                        required: true,
                        message: "Họ và tên không được để trống",
                      },
                    ]}
                  >
                    <Input
                      style={{ fontFamily: "serif" }}
                      className="text-sm"
                      placeholder="Nhập họ và tên"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Số điện thoại không được để trống",
                      },
                      {
                        pattern: /^\+?\d{9,15}$/,
                        message:
                          "Số điện thoại không hợp lệ! (VD: +84123456789)",
                      },
                    ]}
                  >
                    <Input
                      style={{ fontFamily: "serif" }}
                      className="text-sm"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Item>
                  <Form.Item name="province_id" hidden>
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    name="province_name"
                    label="Tỉnh/Thành phố"
                    rules={[{ required: true }]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="label"
                      onChange={handleProvinceChange}
                      value={selectedProvince}
                      options={provinces.map((item) => ({
                        value: item.ProvinceID,
                        label: item.ProvinceName,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item name="district_id" hidden>
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    name="district_name"
                    label="Quận/Huyện"
                    rules={[{ required: true }]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="label"
                      onChange={handleDistrictChange}
                      value={selectedDistrict}
                      options={districts.map((item) => ({
                        value: item.DistrictID,
                        label: item.DistrictName,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item name="ward_id" hidden>
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    name="ward_name"
                    label="Phường/Xã"
                    rules={[{ required: true }]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="label"
                      onChange={handleWardChange}
                      options={wards.map((item) => ({
                        value: item.WardCode,
                        label: item.WardName,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    name="detail"
                    label="Địa chỉ cụ thể"
                    rules={[
                      {
                        required: true,
                        message: "Địa chỉ không được để trống",
                      },
                    ]}
                  >
                    <TextArea
                      style={{ fontFamily: "serif" }}
                      className="text-sm"
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDetail;
