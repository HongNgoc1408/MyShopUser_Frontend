import { Card, Divider, Image, Skeleton, Steps } from "antd";
import React, { useEffect, useState } from "react";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import OrderService from "../../services/OrderService";
import {
  formatDateTime,
  formatVND,
  paymentMethod,
  showError,
  statusOrder,
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
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    // console.log("onChange:", value);
    setCurrent(value);
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getDetail(id);
        // console.log(res.data);
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

  // const handleCancelOrder = async (id) => {
  //   console.log(id);
  //   try {
  //     const cancel = await OrderService.cancel(id);
  //     setOrders(cancel);
  //     notification.success("Hủy đơn thành công");
  //   } catch (error) {
  //     showError(error);
  //   }
  // };

  const getPaymentMethodLabel = (method) => {
    const payment = paymentMethod.find((item) => item.value === method);
    return payment ? payment.label : "Phương thức không xác định";
  };

  const getStatusOrder = (status) => {
    const stt = statusOrder.find((item) => item.value === status);
    return stt ? stt.label : "Phương thức không xác định";
  };

  const orderStatus = orders.orderStatus || "";

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
                labelPlacement="vertical"
                current={current}
                onChange={onChange}
                items={[
                  {
                    title:
                      orderStatus === "Processing"
                        ? "Đơn hàng chờ xét duyệt"
                        : "Đơn hàng đã đặt",
                    description: (
                      <span className="text-gray-400">
                        {formatDateTime(orders.orderDate)}
                      </span>
                    ),
                    icon: (
                      <div
                        className={`border-2 rounded-full p-1 ${
                          orderStatus === "Processing"
                            ? "text-gray-400"
                            : "border-green-600"
                        }`}
                      >
                        <CiReceipt
                          size={30}
                          className={`items-center font-bold ${
                            orderStatus === "Processing"
                              ? "text-gray-400"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Đơn hàng đã thanh toán",
                    description: (
                      <span className="text-gray-400">
                        {orders.amountPaid > 0
                          ? formatVND(orders.amountPaid)
                          : ""}
                      </span>
                    ),
                    icon: (
                      <div className="border-2 border-green-600 rounded-full p-1">
                        <CiCreditCard1
                          size={30}
                          className="items-center text-green-600 font-bold"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Đơn hàng gửi cho đơn vị vận chuyển",

                    icon: (
                      <div className="border-2 border-green-600 rounded-full p-1">
                        <CiDeliveryTruck
                          size={30}
                          className="items-center text-green-600 font-bold"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Chờ giao hàng",
                    icon: (
                      <div className="border-2 rounded-full p-1">
                        <CiInboxIn
                          size={30}
                          className="items-center font-bold"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Đánh giá",
                    icon: (
                      <div className="border-2 rounded-full p-1">
                        <CiStar size={30} className="items-center font-bold" />
                      </div>
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
                      // to={`/orders-detail/${orders.id}`}
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
                  // to={`/orders-detail/${orders.id}`}
                  className="hover:text-current"
                >
                  <div className="flex">
                    <div className="flex-col my-auto justify-start items-center">
                      <div className="text-xl font-semibold">
                        Địa chỉ nhận hàng
                      </div>
                      <div className="text-base"> {orders.receiver}</div>
                      <div className="text-base"> {orders.deliveryAddress}</div>
                    </div>
                    <div className="justify-end items-center text-end"></div>
                  </div>
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
                  // to={`/orders-detail/${orders.id}`}
                  className="hover:text-current"
                >
                  {orders.productOrderDetails.map((product) => (
                    <div className="flex">
                      <div>
                        <Image
                          src={toImageSrc(product.imageUrl)}
                          style={{ width: "100px", height: " 150px" }}
                          // width={100}
                          // height={150}
                        />
                      </div>
                      <div className="flex-col my-auto justify-start items-center ml-10">
                        <p className="text-lg capitalize font-semibold">
                          {product.productName}
                        </p>
                        <p className="text-base">
                          Phân loại hàng: {product.colorName},{product.sizeName}
                        </p>
                        <p className="text-base">
                          Số lượng: {product.quantity}
                        </p>
                      </div>
                      <div className="flex justify-end items-center text-end">
                        <div className="flex justify-end items-center text-end w-1/2">
                          <p className="text-xl capitalize cursor-pointer font-semibold m-1 text-gray-500 line-through">
                            {formatVND(product.originPrice)}
                          </p>

                          <p className="text-xl capitalize cursor-pointer font-semibold m-1 text-orange-600">
                            {formatVND(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
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
                {/* <div className="flex justify-end items-center space-x-2">
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
                </div> */}
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
