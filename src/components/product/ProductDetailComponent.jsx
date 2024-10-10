import React from "react";
import {
  Breadcrumb,
  Carousel,
  Collapse,
  ConfigProvider,
  Form,
  InputNumber,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { Option } from "antd/es/mentions";

import product from "../../assets/product/AoSoMi/SoMiVang.jpeg";
import color from "../../assets/color/AoSoMi/SoMiVang.jpeg";
import color1 from "../../assets/color/AoSoMi/SoMiXanh.jpeg";
import { Tabs } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ProductDetailComponent = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Hướng dẫn chọn size",
      children: <div>{text}</div>,
    },
    {
      key: "2",
      label: "Hướng dẫn bảo quản",
      children: <div>{text}</div>,
    },
  ];

  const onChange1 = (key) => {
    console.log(key);
  };
  const items1 = [
    {
      key: "1",
      label: "Chi tiết sản phẩm",
      children: "Chi tiết sản phẩm",
    },
    {
      key: "2",
      label: "Đánh giá sản phẩm",
      children: "Đánh giá sản phẩm",
    },
    {
      key: "3",
      label: "Hướng dẫn mua hàng",
      children: "Hướng dẫn mua hàng",
    },
  ];
  return (
    <div className="container mx-auto max-lg:px-8 px-24">
      <div className="my-5">
        <Breadcrumb className="text-lg my-5">Trang chủ | Nữ | Áo</Breadcrumb>
        <div class="grid grid-cols-5 gap-5 my-5">
          <div className="col-span-3 flex flex-row">
            <div className="w-1/4">
              <div>
                <img src={product} alt="product1" className="w-3/5 mx-auto" />
              </div>
              <div>
                <img src={product} alt="product1" className="w-3/5 mx-auto" />
              </div>
              <div>
                <img src={product} alt="product1" className="w-3/5 mx-auto" />
              </div>
              <div>
                <img src={product} alt="product1" className="w-3/5 mx-auto" />
              </div>
              <div>
                <img src={product} alt="product1" className="w-3/5 mx-auto" />
              </div>
            </div>
            <div className="w-3/4">
              <ConfigProvider
                theme={{
                  components: {
                    Carousel: {
                      arrowSize: 28,
                    },
                  },
                }}
              >
                <Carousel dotPosition="right" arrows infinite={false}>
                  <div>
                    <Link>
                      <img src={product} alt="product1" className="w-full" />
                    </Link>
                  </div>
                  <div>
                    <Link>
                      <img src={product} alt="product1" className="w-full" />
                    </Link>
                  </div>
                  <div>
                    <Link>
                      <img src={product} alt="product1" className="w-full" />
                    </Link>
                  </div>
                </Carousel>
              </ConfigProvider>
            </div>
          </div>
          <div className="col-span-2 ml-10">
            <div className="flex">
              <p className="w-11/12 font-bold text-2xl">
                Áo sơ mi nữ oversize tn cổ bẻ viền 1túi 002.003
              </p>
              <button className="w-1/12 text-3xl justify-items-center">
                <CiHeart />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex">
                <div className="price-card-product text-orange-600">
                  <p className="text-2xl"> &#8363;189.000</p>
                </div>
                <div className="price-card-product text-gray-500 line-through">
                  <p className="text-2xl">&#8363;245.700</p>
                </div>
                <div className="cursor-pointer font-semibold bg-orange-50 m-1 text-orange-600">
                  <p className="text-xl">30%</p>
                </div>
              </div>
              <div className="flex justify-end">
                <p className="mx-1 my-auto p-auto text-xl">Còn lại: 33 | </p>
                <p className="mx-1 my-auto p-auto text-xl">Đã bán: 97</p>
              </div>
            </div>
            <div className="flex">
              <p className="mr-1 text-lg">Màu sắc:</p>
              <p className="text-lg">Vàng</p>
            </div>
            <div className="flex flex-nowrap">
              <div className="m-1 justify-center">
                <img src={color} alt="" className="w-6 h-6 rounded-full" />
              </div>
              <div className="m-1 justify-center">
                <img src={color1} alt="" className="w-6 h-6 rounded-full" />
              </div>
            </div>
            <div>
              <Form layout="horizontal" className="grid grid-cols-2 gap-2">
                <Form.Item
                  className="m-2"
                  rules={[
                    {
                      required: true,
                      message: "Please select size",
                    },
                  ]}
                >
                  <Select placeholder="-- Chọn --" className="w-full">
                    <Option value="Freesize">Freesize</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="m-2"
                  rules={[
                    {
                      required: true,
                      message: "Please select quantity",
                    },
                  ]}
                >
                  <InputNumber
                    max={99}
                    min={1}
                    defaultValue={1}
                    className="w-full"
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="w-full text-left my-4">
              <button className="dark-button text-base flex justify-center items-center gap-2 w-full py-5 px-4 font-bold rounded-md lg:m-0 md:px-6">
                <span className="relative z-10">Thêm vào giỏ hàng</span>
              </button>
            </div>
            <div className="w-full text-left my-4">
              <button className="light-button border-2 text-base flex justify-center items-center gap-2 w-full py-5 px-4 font-bold rounded-md lg:m-0 md:px-6">
                <span className="relative z-10">Mua ngay</span>
              </button>
            </div>
            <div className="">
              <Collapse
                className="text-base"
                defaultActiveKey={["1"]}
                onChange={onChange}
                expandIconPosition="end"
                items={items}
              />
            </div>
          </div>
        </div>
        <div className="ml-10 uppercase text-2xl">
          <Tabs defaultActiveKey="1" items={items1} onChange={onChange1} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
