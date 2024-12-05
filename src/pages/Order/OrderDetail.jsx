import { Card, Divider, Image, Skeleton, Steps, Tag } from "antd";
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
  CiSquareRemove,
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

  const items = [
    {
      title:
        orders.amountPaid > 0 ? (
          <div className="text-nowrap">Đơn hàng đã thanh toán</div>
        ) : (
          <div className="text-nowrap">Đơn hàng chưa thanh toán</div>
        ),

      description: (
        <span className="text-gray-600">
          {orders.amountPaid > 0
            ? formatVND(orders.amountPaid)
            : orders.paymentMethod}
        </span>
      ),
      icon: (
        <div
          className={`border-2 rounded-full p-1 ${
            orders.amountPaid > 0
              ? "border-green-600"
              : orders.orderStatus === "Canceled"
              ? "border-red-600"
              : orders.orderStatus === "Received" || orders.reviewed
              ? "border-green-600"
              : "border-gray-600"
          }`}
        >
          <CiCreditCard1
            size={30}
            className={`items-center font-bold ${
              orders.amountPaid > 0
                ? "text-green-600"
                : orders.orderStatus === "Canceled"
                ? "text-red-600"
                : orders.orderStatus === "Received" || orders.reviewed
                ? "text-green-600"
                : "text-gray-600"
            }`}
          />
        </div>
      ),
    },
    {
      title:
        orderStatus === "Processing" ? (
          <div className="text-nowrap">Đơn hàng đang xử lý</div>
        ) : (
          <div className="text-nowrap">Đơn hàng đã duyệt</div>
        ),
      description: (
        <span className="text-gray-600">
          {`Ngày đặt: ${formatDateTime(orders.orderDate)}`}
        </span>
      ),
      icon: (
        <div
          className={`border-2 rounded-full p-1 ${
            orderStatus === "Processing"
              ? "border-gray-600"
              : orders.orderStatus === "Canceled"
              ? "border-red-600"
              : "border-green-600"
          }`}
        >
          <CiReceipt
            size={30}
            className={`items-center font-bold ${
              orderStatus === "Processing"
                ? "text-gray-600"
                : orders.orderStatus === "Canceled"
                ? "text-red-600"
                : "text-green-600"
            }`}
          />
        </div>
      ),
    },
    {
      title:
        orderStatus === "Shipping" || orderStatus === "Received" ? (
          <div className="text-nowrap">Đơn hàng đang vận chuyển</div>
        ) : (
          <div className="text-nowrap">Đơn hàng chờ vận chuyển</div>
        ),
      description: (
        <span className="text-gray-600">
          {orders.shippingCode ? `Mã vận đơn: ${orders.shippingCode}` : ""}
        </span>
      ),
      icon: (
        <div
          className={`border-2 rounded-full p-1 ${
            orderStatus === "Shipping" || orderStatus === "Received"
              ? "border-green-600"
              : orders.orderStatus === "Canceled"
              ? "border-red-600"
              : "border-gray-600"
          }`}
        >
          <CiDeliveryTruck
            size={30}
            className={`items-center font-bold ${
              orderStatus === "Shipping" || orderStatus === "Received"
                ? "text-green-600"
                : orders.orderStatus === "Canceled"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          />
        </div>
      ),
    },
    {
      title:
        orderStatus === "Received" ? (
          <div className="text-nowrap">Đơn hàng đã nhận</div>
        ) : (
          <div className="text-nowrap">Đơn hàng chưa nhận</div>
        ),
      description: (
        <span className="text-gray-600">
          {orders.receivedDate !== "0001-01-01T00:00:00"
            ? `Ngày nhận: ${formatDateTime(orders.receivedDate)}`
            : ""}
        </span>
      ),
      icon: (
        <div
          className={`border-2 rounded-full p-1 ${
            orderStatus === "Received"
              ? "border-green-600"
              : orders.orderStatus === "Canceled"
              ? "border-red-600"
              : "border-gray-600"
          }`}
        >
          <CiInboxIn
            size={30}
            className={`items-center font-bold ${
              orderStatus === "Received"
                ? "text-green-600"
                : orders.orderStatus === "Canceled"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          />
        </div>
      ),
    },
    {
      title: orders.reviewed ? (
        <div className="text-nowrap">Đã đánh giá</div>
      ) : (
        <div className="text-nowrap">Chưa đánh giá</div>
      ),
      icon: (
        <div
          className={`border-2 rounded-full p-1 ${
            orders.reviewed
              ? "border-green-600"
              : orders.orderStatus === "Canceled"
              ? "border-red-600"
              : "border-gray-600"
          }`}
        >
          <CiStar
            size={30}
            className={`items-center font-bold ${
              orders.reviewed
                ? "text-green-600"
                : orders.orderStatus === "Canceled"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          />
        </div>
      ),
    },
    {
      title: <div className="text-nowrap">Đã hủy</div>,
      icon: (
        <div
          className={`border-2 rounded-full p-1 ${
            orders.orderStatus === "Canceled"
              ? "border-green-600"
              : "border-gray-600"
          }`}
        >
          <CiSquareRemove
            size={30}
            className={`items-center font-bold ${
              orders.orderStatus === "Canceled"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          />
        </div>
      ),
    },
  ];

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
                items={items}
                current={
                  orders.reviewed
                    ? 5
                    : orders.orderStatus === "Received"
                    ? 3
                    : orders.orderStatus === "Shipping"
                    ? 3
                    : orders.orderStatus === "Confirmed"
                    ? 1
                    : orders.orderStatus === "Processing"
                    ? 0
                    : orders.orderStatus === "Cancel"
                    ? 5
                    : 0
                }
                onChange={onChange}
              />
            </div>
            <div className="container mx-auto max-lg:px-8 px-20">
              <Card
                key={orders.id}
                title={
                  <>
                    <p className="text-lg pt-2">
                      Ngày đặt: {formatDateTime(orders.orderDate)}
                    </p>

                    <p className="text-lg pb-2">
                      {orders.receivedDate !== "0001-01-01T00:00:00"
                        ? `Ngày nhận hàng: ${formatDateTime(
                            orders.receivedDate
                          )}`
                        : ""}
                    </p>
                  </>
                }
                extra={
                  <div className="flex tetx-base">
                    <CiDeliveryTruck size={25} className="mx-1" />
                    <Link className="text-lg mx-1">
                      Mã đơn hàng: {orders.id} |
                    </Link>

                    <p className="text-lg mx-1 text-blue-600">
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
                      <div className="text-xl font-semibold mb-2">
                        Địa chỉ nhận hàng
                      </div>
                      <div className="text-lg"> {orders.receiver}</div>
                      <div className="text-lg"> {orders.deliveryAddress}</div>
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
                  {orders.productOrderDetails.map((product, index) => (
                    <div className="flex py-4 border-b" key={index}>
                      <div className="w-1/4">
                        <Image
                          src={toImageSrc(product.imageUrl)}
                          style={{ width: "100px", height: " 150px" }}
                        />
                      </div>
                      <div className="w-2/4 flex-col my-auto">
                        <p className="text-xl capitalize font-semibold">
                          {product.productName}
                        </p>
                        <p className="text-lg">Màu sắc: {product.colorName}</p>
                        <p className="text-lg">Kích cỡ: {product.sizeName}</p>
                        <p className="text-lg">Số lượng: {product.quantity}</p>
                      </div>
                      <div className="w-1/4 text-right flex justify-end items-center">
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
                      <p className="font-semibold text-orange-600">
                        {orders ? formatVND(orders.total) : "0 ₫"}
                      </p>
                    </div>
                    <div className="flex justify-end items-center text-xl">
                      <p className="font-semibold text-orange-600">
                        {orders ? formatVND(orders.shippingCost) : "0 ₫"}
                      </p>
                    </div>
                    <div className="flex justify-end items-center text-xl">
                      <p className="font-semibold text-orange-600">
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
