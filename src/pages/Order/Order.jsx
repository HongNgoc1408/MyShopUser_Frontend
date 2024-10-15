import {
  Button,
  Card,
  ConfigProvider,
  Divider,
  Form,
  Radio,
  Skeleton,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import { EyeTwoTone } from "@ant-design/icons";
import { formatDateTime, showError } from "../../services/commonService";
import OrderService from "../../services/OrderService";
import { CiLocationOn } from "react-icons/ci";
import CartService from "../../services/CartService";
import UserService from "../../services/UserService";
import AddressService from "../../services/AddressService";
import PaymentsService from "../../services/PaymentsService";
import { useForm } from "antd/es/form/Form";
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
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await OrderService.getAll();
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const showModal = () => {
    form.setFieldsValue();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-100">
        {isLoading ? (
          <Skeleton paragraph={{ rows: 20 }} />
        ) : (
          <>
            <div className="container mx-20">
              <BreadcrumbLink breadcrumb={breadcrumb} />
            </div>
            <div className="container mx-auto max-lg:px-8 px-20 w-full">
              <Card className="text-base my-5 p-5 bg-white shadow-md rounded-none">
                <div className="space-x-2">
                  <div className="flex-col flex">
                    <div className="flex justify-between">
                      <div className="flex space-x-1 py-2">
                        <CiLocationOn className="text-xl text-orange-600" />
                        <span className="font-bold"></span>
                      </div>
                      <span
                        onClick={showModal}
                        className="text-blue-500 cursor-pointer hover:text-orange-600 py-2"
                      >
                        Thay đổi
                      </span>
                    </div>
                    <div className="flex space-x-1 py-2">
                      <span className="truncate w-80 lg:w-80 md:w-full"></span>
                    </div>
                  </div>
                </div>
                <Divider className="my-[0.8rem]" />
                <div className="flex justify-between py-2">
                  <div>Tạm tính</div>
                  <div></div>
                </div>
                <div className="flex justify-between">
                  <div>Phí giao hàng</div>
                  <div></div>
                </div>
                <Divider />
                <div className="flex justify-between">
                  <div>Tổng tiền</div>
                  <div className="text-xl font-bold text-red-600"></div>
                </div>
              </Card>
              <Card className="rounded-sm" title="Thanh toán">
                <Radio.Group className="flex flex-col space-y-3">
                  <Radio value="">
                    <div className="flex space-x-4 items-center">
                      <span></span>
                    </div>
                  </Radio>
                </Radio.Group>
              </Card>
            </div>
            <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
              <div className="container mx-auto max-lg:px-8 px-20">
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
                      pagination={false}
                      loading={isLoading}
                      // columns={columns}
                      dataSource={data}
                      rowKey={(record) => record.id}
                      className="overflow-x-auto"
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Order;
