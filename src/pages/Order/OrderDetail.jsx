import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  notification,
  Popover,
  Row,
  Skeleton,
  Steps,
} from "antd";
import React, { useEffect, useState } from "react";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import OrderService from "../../services/OrderService";
import {
  formatDateTime,
  formatVND,
  paymentMethod,
  showError,
  statusOrders,
  toImageSrc,
} from "../../services/commonService";
import { Link, useParams } from "react-router-dom";
import {
  CiCreditCard1,
  CiDeliveryTruck,
  CiInboxIn,
  CiReceipt,
  CiStar,
} from "react-icons/ci";

const breadcrumb = (id) => [
  {
    path: "/",
    title: "Trang chủ",
  },
  {
    path: "/order",
    title: "Đơn hàng",
  },
  {
    title: `Chi tiết đơn hàng ${id}`,
  },
];

const OrderDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [current, setCurrent] = useState();
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getDetail(id);
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.error("Error:", error);
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async (id) => {
    console.log(id);
    try {
      const cancel = await OrderService.cancel(id);
      setOrders(cancel);
      notification.success("Hủy đơn thành công");
    } catch (error) {
      showError(error);
    }
  };

  const getPaymentMethodLabel = (method) => {
    const payment = paymentMethod.find((item) => item.value === method);
    return payment ? payment.label : "Phương thức không xác định";
  };

  const getStatusOrder = (status) => {
    const stt = statusOrders.find((item) => item.value === status);
    return stt ? stt.label : "Phương thức không xác định";
  };

  return (
    <div className="bg-gray-100">
      {isLoading ? (
        <Skeleton paragraph={{ rows: 20 }} />
      ) : (
        <div className="container mx-auto max-lg:px-8 px-20 w-full">
          <div className="container mx-20">
            <BreadcrumbLink breadcrumb={breadcrumb(id)} />
          </div>
          <div className="flex lg:flex-col sm:flex-col justify-between lg:space-x-4">
            <div className="container mx-auto max-lg:px-8 px-28 ">
              <Steps
                current={current}
                onChange={onChange}
                items={[
                  {
                    icon: (
                      <Popover content={<span>Đơn hàng đã đặt</span>}>
                        <CiReceipt size={30} className="items-center" />
                      </Popover>
                    ),
                  },
                  {
                    icon: (
                      <Popover
                        content={
                          <span>
                            Đơn hàng đã thanh toán
                            {orders.paymentMethod === "VNPay"
                              ? `${formatVND(orders.total)}`
                              : ""}
                          </span>
                        }
                      >
                        <CiCreditCard1 size={30} className="items-center" />
                      </Popover>
                    ),
                  },
                  {
                    icon: (
                      <Popover
                        content={
                          <span>Đơn hàng gửi cho đơn vị vận chuyển</span>
                        }
                      >
                        <CiDeliveryTruck size={30} className="items-center" />
                      </Popover>
                    ),
                  },
                  {
                    icon: (
                      <Popover content={<span>Chờ giao hàng</span>}>
                        <CiInboxIn size={30} className="items-center" />
                      </Popover>
                    ),
                  },
                  {
                    icon: (
                      <Popover content={<span>Đánh giá</span>}>
                        <CiStar size={30} className="items-center" />
                      </Popover>
                    ),
                  },
                ]}
              />
            </div>
            <div className="container mx-auto max-lg:px-8 px-20">
              <Card
                key={orders.id}
                title={formatDateTime(orders.orderDate)}
                extra={
                  <div className="flex tetx-base">
                    <CiDeliveryTruck size={20} className="mx-1" />
                    <Link
                      to={`/orders-detail/${orders.id}`}
                      className="text-base mx-1"
                    >
                      Mã đơn hàng: {orders.id} |
                    </Link>
                    <p className="text-base mx-1">
                      {orders ? getStatusOrder(orders.orderStatus) : "Không rõ"}
                    </p>
                  </div>
                }
                className="bg-white rounded-none my-5"
              >
                <Link
                  to={`/orders-detail/${orders.id}`}
                  className="hover:text-current"
                >
                  <Row>
                    <Col
                      xs={2}
                      sm={4}
                      md={6}
                      lg={8}
                      xl={10}
                      className="flex-col my-auto justify-start items-center"
                    >
                      <div className="text-xl font-semibold">
                        Địa chỉ nhận hàng
                      </div>
                      <div className="text-base"> {orders.receiver}</div>
                      <div className="text-base"> {orders.deliveryAddress}</div>
                    </Col>
                    <Col
                      xs={2}
                      sm={4}
                      md={6}
                      lg={8}
                      xl={10}
                      className="justify-end items-center text-end"
                    ></Col>
                  </Row>
                </Link>
              </Card>
            </div>
            <div className="container mx-auto max-lg:px-8 px-20">
              <Card
                key={orders.id}
                // title={formatDateTime(orders.orderDate)}
                // extra={
                //   <div className="flex tetx-base">
                //     <CiDeliveryTruck size={20} className="mx-1" />
                //     <Link
                //       to={`/orders-detail/${orders.id}`}
                //       className="text-base mx-1"
                //     >
                //       {orders.orderStatus} |
                //     </Link>
                //     <p className="text-base mx-1">{orders.orderStatus}</p>
                //   </div>
                // }
                className="bg-white rounded-none my-5"
              >
                <Link
                  to={`/orders-detail/${orders.id}`}
                  className="hover:text-current"
                >
                  {orders.productOrderDetails.map((product) => (
                    <Row>
                      <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                        <Image
                          src={toImageSrc(product.imageUrl)}
                          width={100}
                          height={150}
                        />
                      </Col>
                      <Col
                        xs={2}
                        sm={4}
                        md={6}
                        lg={8}
                        xl={10}
                        className="flex-col my-auto justify-start items-center"
                      >
                        <p className="text-lg capitalize font-semibold">
                          {product.productName}
                        </p>
                        <p className="text-base">
                          Phân loại hàng: {product.colorName},{product.sizeName}
                        </p>
                        <p className="text-base">
                          Số lượng: {product.quantity}
                        </p>
                      </Col>
                      <Col
                        xs={2}
                        sm={4}
                        md={6}
                        lg={8}
                        xl={10}
                        className="flex justify-end items-center text-end"
                      >
                        <p className="text-base capitalize cursor-pointer font-semibold  m-1 text-gray-500 line-through">
                          {formatVND(product.originPrice)}
                        </p>
                        <p className="text-base capitalize cursor-pointer font-semibold m-1 text-orange-600">
                          {formatVND(product.price)}
                        </p>
                      </Col>
                    </Row>
                  ))}
                </Link>
                <Divider />
                <div className="w-full flex justify-end items-end text-right">
                  <div className="w-1/4 flex-col my-auto justify-end items-end text-right text-nowrap">
                    <div className="flex justify-end items-center text-xl">
                      <p>Tổng tiền hàng:</p>
                    </div>
                    <div className="flex justify-end items-center text-xl">
                      <p>Phí vận chuyển:</p>
                    </div>
                    <div className="flex justify-end items-center text-xl">
                      <p>Phương thức thanh toán:</p>
                    </div>
                  </div>
                  <div className="w-1/4 flex-col justify-end items-end text-right">
                    <div className="flex justify-end items-center text-xl">
                      <p>{orders ? formatVND(orders.total) : "0 ₫"}</p>
                    </div>
                    <div className="flex justify-end items-center text-xl">
                      <p>{orders ? formatVND(orders.shippingCost) : "0 ₫"}</p>
                    </div>
                    <div className="flex justify-end items-center text-xl">
                      <p>
                        {orders
                          ? getPaymentMethodLabel(orders.paymentMethod)
                          : "Không rõ"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-2">
                  <Button
                    onClick={() => handleCancelOrder(orders.id)}
                    danger
                    type="primary"
                    className={`text-lg mt-5 ${
                      orders.orderStatus === "Canceled"
                        ? "hidden"
                        : orders.orderStatus === "Processing"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    Hủy đơn hàng
                  </Button>
                  <Button
                    type="primary"
                    className={`text-lg mt-5 ${
                      orders.orderStatus === "AwaitingPickup" ? "" : "hidden"
                    }`}
                  >
                    Đã nhận hàng
                  </Button>
                  <Button
                    type="primary"
                    className={`text-lg mt-5 ${
                      orders.orderStatus === "Received" ? "" : "hidden"
                    }`}
                  >
                    Đánh giá
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
