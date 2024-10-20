import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  notification,
  Row,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import OrderService from "../../services/OrderService";
import {
  formatDateTime,
  formatVND,
  showError,
  statusOrders,
  toImageSrc,
} from "../../services/commonService";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getAll();
        const orderData = res.data.items;
        // console.log(res.data);

        const orderDetail = orderData.map(async (order) => {
          const detail = await OrderService.getDetail(order.id);

          return { ...order, detail: detail.data };
        });

        const orderDetails = await Promise.all(orderDetail);
        // console.log(orderDetails);
        setOrders(orderDetails);
      } catch (error) {
        console.error("Error:", error);
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);

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
            <BreadcrumbLink breadcrumb={breadcrumb} />
          </div>
          <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
            <div className="container mx-auto max-lg:px-8 px-20">
              {orders.map((order) => (
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
                        className="text-lg mx-1"
                      >
                        {getStatusOrder(order.detail.orderStatus)}
                      </Link>
                    </div>
                  }
                  className="bg-white rounded-none my-5"
                >
                  <Link
                    to={`/order-detail/${order.id}`}
                    className="hover:text-current"
                  >
                    {order.detail.productOrderDetails.map((product, i) => (
                      <Row key={i}>
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
                          <p className="text-xl capitalize font-semibold">
                            {product.productName}
                          </p>
                          <p className="text-lg">
                            Phân loại hàng: {product.colorName}|{" "}
                            {product.sizeName}
                          </p>
                          <p className="text-lg">
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
                          <p className="text-xl capitalize cursor-pointer font-semibold  m-1 text-gray-500 line-through">
                            {formatVND(product.originPrice)}
                          </p>
                          <p className="text-xl capitalize cursor-pointer font-semibold m-1 text-orange-600">
                            {formatVND(product.price)}
                          </p>
                        </Col>
                      </Row>
                    ))}
                  </Link>
                  <div className=""></div>
                  <Divider />
                  <div className="flex justify-end items-center price-card-product">
                    <p className="text-2xl cursor-pointer text-orange-600">
                      Thành tiền : {formatVND(order.detail.total)}
                    </p>
                  </div>
                  <div className="flex justify-end items-center space-x-2">
                    <Button
                      onClick={() => handleCancelOrder(order.id)}
                      danger
                      type="primary"
                      className={`text-lg mt-5 ${
                        order.detail.orderStatus === "Canceled" ? "hidden" : ""
                      }`}
                    >
                      Hủy đơn hàng
                    </Button>
                    <Button type="primary" className="text-lg mt-5">
                      Đã nhận hàng
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
