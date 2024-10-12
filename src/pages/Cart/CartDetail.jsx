import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  InputNumber,
  notification,
  Popconfirm,
  Row,
  Table,
} from "antd";
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

const CartDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  //   (onUpdate, handleDelete) =>
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      align: "center",
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: "Đơn giá",
      className: "price",
      dataIndex: "price",
      width: "200px",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (_, record) => (
        <Flex justify="center" align="center" className="space-x-1">
          <InputNumber min={1} />
        </Flex>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      width: "200px",
    },
    {
      title: "Thực hiện",
      align: "center",
      render: (_, record) => (
        <Flex justify="center" align="center" className="space-x-1">
          {/* <Tooltip title="Chỉnh sửa">
              <Button onClick={() => onUpdate(record)}>
                <EditTwoTone />
              </Button>
            </Tooltip> */}
          <Popconfirm
            title={`Xác nhận xóa ${record.name}`}
            // onConfirm={() => handleDelete(record.id)}
            loading={loadingDelete}
          >
            <Button>
              <FiDelete />
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const data = [];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  //   const onUpdate = (record) => {
  //     form.setFieldsValue(record);
  //     setUpdateID(record.id);
  //     setIsUpdate(true);
  //   };

  //   const handleUpdate = async () => {
  //     setLoadingUpdate(true);
  //     try {
  //       const values = await form.getFieldsValue();

  //       await CategoryService.update(updateID, values);
  //       notification.success({
  //         message: `Cập nhật ${values.name} thành công.`,
  //       });
  //       setUpdate(!update);
  //       setIsUpdate(false);
  //       form.resetFields();
  //     } catch (error) {
  //       showError(error);
  //     } finally {
  //       setLoadingUpdate(false);
  //     }
  //   };

  //   const handleDelete = async (id) => {
  //     setLoadingDelete(true);
  //     try {
  //       await CategoryService.remove(id);
  //       const newData = data.filter((item) => !(item.id === id));
  //       setData(newData);
  //       notification.success({
  //         message: "Xóa thành công",
  //       });
  //     } catch (error) {
  //       showError(error);
  //     } finally {
  //       setLoadingDelete(false);
  //     }
  //   };

  //   const handleClear = () => {
  //     setIsUpdate(false);
  //     form.resetFields();
  //   };

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto max-lg:px-8 px-20">
          <div className="my-5 p-5 bg-white shadow-md">
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              pagination={false}
              loading={isLoading}
              columns={columns}
              //   columns={columns(onUpdate, handleDelete)}
              dataSource={data}
              rowKey={(record) => record.id}
              className="overflow-x-auto"
            />
          </div>
        </div>
        <div className="container mx-auto max-lg:px-8 px-20 fixed bottom-0">
          <div className="p-5 bg-white shadow-md">
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={12}>
                <div className="flex">
                  <div className="justify-center items-center ">
                    <Checkbox>
                      <p className="text-xl">Chọn tất cả</p>
                    </Checkbox>
                  </div>
                  <div className="text-xl mx-5 hover:text-orange-600 justify-center items-center ">
                    <p>Xóa</p>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex">
                  <div className="justify-center items-center ">
                    <p className="text-2xl">Tổng thanh toán: </p>
                  </div>

                  <div className="price-card-product text-orange-600 justify-center items-center ">
                    <p className="text-2xl ml-5 ">100.000đ</p>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="w-full">
                  <button className="dark-button text-xl w-72">
                    <span className="relative z-10">Mua hàng</span>
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
