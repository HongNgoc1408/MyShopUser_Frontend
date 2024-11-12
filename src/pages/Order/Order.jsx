import {
  Button,
  Card,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Rate,
  Result,
  Skeleton,
  Tabs,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import OrderService from "../../services/OrderService";
import {
  formatDateTime,
  formatVND,
  showError,
  statusOrders,
  toImageLink,
  toImageSrc,
} from "../../services/commonService";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  PlusOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const breadcrumb = [
  {
    path: "/",
    title: "Trang chủ",
  },
  {
    title: "Đơn đặt hàng",
  },
];

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [dataReview, setDataReview] = useState([]);
  const [id, setID] = useState();
  const [isReviewSubmit, setIsReviewSubmit] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedTab, setSelectedTab] = useState("6");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getAll();

        setOrders(res.data.items);
      } catch (error) {
        console.error("Error:", error);
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const showModal = async (orderId) => {
    // console.log(orderId);
    setID(orderId);
    setIsModalOpen(true);
    try {
      const res = await OrderService.getDetail(orderId);
      console.log(res.data);
      setDataReview(res.data.productOrderDetails);
      form.resetFields();
      form.setFieldsValue({
        review: res.data.productOrderDetails.map((value) => ({
          ...value,
          star: 5,
        })),
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleCancel = () => {
    // console.log("Closing modal");
    setIsModalOpen(false);
    setID(undefined);
    setDataReview([]);
    setFileList([]);
  };

  const onFinish = async ({ review }) => {
    if (id) {
      try {
        // console.log(review)
        setLoading(true);
        const formData = new FormData();

        // review.forEach((e) => delete e.productName) // Xóa productName

        review.forEach((item, i) => {
          Object.keys(item).forEach((key) => {
            const value = item[key];
            // console.log('value', value)
            if (value) {
              formData.append(`reviews[${i}].${key}`, value.toString());
            }
          });

          const images = fileList.find(
            (e) =>
              e.productId === item.productId &&
              e.colorName === item.colorName &&
              e.sizeName === item.sizeName
          )?.files;

          if (images) {
            images.forEach((image) => {
              if (image.originFileObj) {
                formData.append(`reviews[${i}].images`, image.originFileObj);
              }
            });
          }
        });

        await OrderService.review(id, formData);
        const updatedOrder = await OrderService.getDetail(id);
        setOrderDetails(updatedOrder.data);
        notification.success({
          message: "Thành công",
          placement: "top",
          description: "Đã gửi đánh giá của bạn.",
          className: "text-green-500",
        });

        setFileList([]);
        setIsReviewSubmit(true);
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
        setIsModalOpen(false);
      }
    }
  };

  const handleChange = (productId, colorName, sizeName, newFileList) => {
    const existingProduct = fileList.some(
      (item) =>
        item.productId === productId &&
        item.colorName === colorName &&
        item.sizeName === sizeName
    );

    let updatedList;
    if (existingProduct) {
      updatedList = fileList.map((item) =>
        item.productId === productId &&
        item.colorName === colorName &&
        item.sizeName === sizeName
          ? { ...item, files: newFileList }
          : item
      );
    } else {
      updatedList = [
        ...fileList,
        { productId, colorName, sizeName, files: newFileList },
      ];
    }
    setFileList(updatedList);
  };

  // const handleReceivedOrder = async (id) => {
  //   // console.log(id);
  //   try {
  //     await OrderService.received(id, { orderStatus: 4 });
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order.id === id
  //           ? { ...order, detail: { ...order.detail, orderStatus: "Received" } }
  //           : order
  //       )
  //     );

  //     notification.success({
  //       message: "Success",
  //       description: "Đã cập nhật trạng thái đơn hàng thành 'Đã nhận hàng'.",
  //     });
  //   } catch (error) {
  //     showError(error);
  //   }
  // };

  const handleReceivedOrder = async (id) => {
    try {
      await OrderService.received(id, { orderStatus: 4 });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                orderStatus: "Received",
                detail: { ...order.detail, orderStatus: "Received" },
              }
            : order
        )
      );

      notification.success({
        message: "Success",
        placement: "top",
        description: "Đã cập nhật trạng thái đơn hàng thành 'Đã nhận hàng'.",
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleCancelOrder = async (id) => {
    // console.log(id);
    try {
      await OrderService.cancel(id);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, detail: { ...order.detail, orderStatus: "Canceled" } }
            : order
        )
      );
      // setOrders(cancel);
      notification.success({
        message: "Success",
        placement: "top",
        description: "Đã hủy đơn hàng thành công.",
      });
    } catch (error) {
      showError(error);
    }
  };

  const getStatusOrder = (status) => {
    const stt = statusOrders.find((item) => item.value === status);
    return stt ? stt.label : "Phương thức không xác định";
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const items = [
    { key: "6", label: "Tất cả" },
    { key: "0", label: "Đang xử lý" },
    { key: "1", label: "Đã duyệt" },
    { key: "2", label: "Đang chờ lấy hàng" },
    { key: "3", label: "Đang vận chuyển" },
    { key: "4", label: "Đã nhận" },
    { key: "5", label: "Đã hủy" },
  ];

  const filteredOrders =
    selectedTab === "6"
      ? orders
      : orders.filter((order) => order.orderStatus === parseInt(selectedTab));

  const onChange = (key) => {
    setSelectedTab(key);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okText="Gửi đánh giá"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          // danger: true,
        }}
        confirmLoading={loading}
        cancelButtonProps={{
          // className: "rounded-sm",
          disabled: loading,
        }}
        destroyOnClose
        centered
        title={`Đánh giá đơn hàng`}
        className="rounded-sm"
        styles={{
          content: { borderRadius: 3, margin: "0.5rem 0" },
        }}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="changeEmail"
            onFinish={onFinish}
          >
            {dom}
          </Form>
        )}
      >
        <div className="modal-body space-y-4 mt-4">
          <Form.List
            initialValue={dataReview.map((value) => ({
              productId: value.productId,
              colorName: value.colorName,
              sizeName: value.sizeName,
              star: 5,
              productName: value.productName,
              imageUrl: value.imageUrl,
            }))}
            name="review"
          >
            {(fields) => (
              <>
                {fields.map((field, i) => (
                  <div key={i}>
                    <Form.Item
                      dependencies={["review", field.name, "productId"]}
                    >
                      {({ getFieldValue }) => {
                        const productName = getFieldValue([
                          "review",
                          field.name,
                          "productName",
                        ]);
                        const imageUrl = getFieldValue([
                          "review",
                          field.name,
                          "imageUrl",
                        ]);
                        const colorName = getFieldValue([
                          "review",
                          field.name,
                          "colorName",
                        ]);
                        const sizeName = getFieldValue([
                          "review",
                          field.name,
                          "sizeName",
                        ]);
                        return (
                          <div className="flex items-center">
                            <img
                              className="w-20 h-20 object-cover mr-2"
                              src={toImageLink(imageUrl)}
                              alt={productName}
                            />
                            <span className="text-gray-700 capitalize">
                              {productName}
                            </span>
                            <span className="text-gray-700 ml-5">
                              Phân loại: {colorName}| {sizeName}
                            </span>
                          </div>
                        );
                      }}
                    </Form.Item>

                    <Divider className="my-1" />
                    <Form.Item
                      layout="horizontal"
                      label="Chất lượng sản phẩm"
                      name={[field.name, "star"]}
                      rules={[
                        {
                          validator: (_, value) =>
                            value < 1
                              ? Promise.reject(new Error("Tối thiểu 1 sao"))
                              : Promise.resolve(),
                        },
                      ]}
                      className="mb-0"
                    >
                      <Rate count={5} />
                    </Form.Item>
                    <div className="bg-gray-50">
                      <Form.Item name={[field.name, "description"]}>
                        <Input.TextArea
                          placeholder="Nhận xét sản phẩm!"
                          showCount
                          maxLength={150}
                          className="text-sm"
                        />
                      </Form.Item>
                      <Form.Item
                        dependencies={["review", field.name, "productId"]}
                        label="Hình ảnh đính kèm"
                      >
                        {({ getFieldValue }) => {
                          const productId = getFieldValue([
                            "review",
                            field.name,
                            "productId",
                          ]);
                          const colorName = getFieldValue([
                            "review",
                            field.name,
                            "colorName",
                          ]);
                          const sizeName = getFieldValue([
                            "review",
                            field.name,
                            "sizeName",
                          ]);
                          const currentFileList =
                            fileList.find(
                              (e) =>
                                e.productId === productId &&
                                e.colorName === colorName &&
                                e.sizeName === sizeName
                            )?.files || [];
                          return (
                            <Upload
                              multiple
                              beforeUpload={() => false}
                              listType="picture-card"
                              fileList={currentFileList}
                              onChange={({ fileList }) =>
                                handleChange(
                                  productId,
                                  colorName,
                                  sizeName,
                                  fileList
                                )
                              }
                            >
                              {currentFileList.length >= 3
                                ? null
                                : uploadButton}
                            </Upload>
                          );
                        }}
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </div>
      </Modal>
      <div className="bg-gray-100">
        {isLoading ? (
          <Skeleton paragraph={{ rows: 20 }} />
        ) : (
          <div className="container mx-auto max-lg:px-8 px-20 w-full">
            <div className="container mx-20">
              <BreadcrumbLink breadcrumb={breadcrumb} />
            </div>
            <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
              <div className="container mx-auto max-lg:px-8 px-20">
                <div className="bg-white">
                  <Tabs
                    defaultActiveKey="6"
                    items={items}
                    onChange={onChange}
                    centered
                  />
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center text-gray-500 my-5 bg-white">
                    <Result
                      icon={<SmileOutlined />}
                      title="Không có đơn hàng nào!"
                    />
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <Card
                      key={order.id}
                      title={
                        <span className="text-lg font-semibold">
                          {formatDateTime(order.orderDate)}
                        </span>
                      }
                      extra={
                        <div className="flex text-lg font-semibold">
                          <span className="">Trạng thái đơn hàng:</span>
                          <Link
                            to={`/order-detail/${order.id}`}
                            className="text-lg mx-1 text-blue-600"
                          >
                            {getStatusOrder(order.orderStatus)}
                          </Link>
                        </div>
                      }
                      className="bg-white rounded-none my-5"
                    >
                      <Link
                        to={`/order-detail/${order.id}`}
                        className="hover:text-current"
                      >
                        <div className="flex">
                          <div className="flex w-1/2">
                            <div className="justify-start items-center mr-5">
                              <Image
                                src={toImageSrc(order.product.imageUrl)}
                                width={100}
                                height={150}
                              />
                            </div>

                            <div className="flex-col my-auto justify-start items-center">
                              <p className="text-xl capitalize font-semibold">
                                {order.product.name}
                              </p>

                              {/* <p className="text-lg">
                            Phân loại hàng: {order.product.colorName}|{" "}
                            {order.product.sizeName}
                          </p>
                          <p className="text-lg">
                            Số lượng: {order.product.quantity}
                          </p> */}
                            </div>
                          </div>

                          <div className="flex justify-end items-center text-end w-1/2">
                            {order.product.discount > 0 && (
                              <p className="text-xl capitalize cursor-pointer font-semibold m-1 text-gray-500 line-through">
                                {formatVND(order.product.price)}
                              </p>
                            )}
                            <p className="text-xl capitalize cursor-pointer font-semibold m-1 text-orange-600">
                              {formatVND(
                                order.product.discount > 0
                                  ? (order.product.price *
                                      (100 - order.product.discount)) /
                                      100
                                  : order.product.price
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className=""></div>
                      <Divider />
                      <div className="flex justify-end items-center price-card-product">
                        <p className="text-2xl cursor-pointer text-orange-600">
                          Thành tiền : {formatVND(order.total)}
                        </p>
                      </div>
                      <div className="flex justify-end items-center space-x-2">
                        <Button
                          onClick={() => handleCancelOrder(order.id)}
                          danger
                          type="primary"
                          className={`text-lg mt-5 ${
                            [0, 1].includes(order.orderStatus) ? "" : "hidden"
                          }`}
                        >
                          Hủy đơn hàng
                        </Button>
                        <Button
                          type="primary"
                          className={`text-lg mt-5 ${
                            [2, 3].includes(order.orderStatus) ? "" : "hidden"
                          }`}
                          onClick={() => handleReceivedOrder(order.id)}
                        >
                          Đã nhận hàng
                        </Button>
                        {!isReviewSubmit && (
                          <Button
                            type="primary"
                            className={`text-lg mt-5 ${
                              order.orderStatus === 4 &&
                              order.reviewed === false
                                ? ""
                                : "hidden"
                            }`}
                            onClick={() => showModal(order.id)}
                          >
                            Đánh giá
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
