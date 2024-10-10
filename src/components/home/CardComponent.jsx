import React, { useEffect, useState } from "react";
import { Badge, Image, Rate } from "antd";

import product from "../../assets/product/AoSoMi/SoMiVang.jpeg";
import color from "../../assets/color/AoSoMi/SoMiVang.jpeg";
import color1 from "../../assets/color/AoSoMi/SoMiXanh.jpeg";
import { CiHeart } from "react-icons/ci";

import ModelProductComponent from "./ModelProductComponent";
import { Link } from "react-router-dom";
const CardComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <Badge.Ribbon
        text="Sale"
        color="red"
        placement="start"
        className="text-base z-10 cursor-pointer"
      >
        <div className="border-2 hover:shadow-md">
          <div className="relative flex flex-col items-end group">
            <Link
              to="/product"
              className="z-10 hover:no-underline hover:text-current"
            >
              <Image
                preview={false}
                src={product}
                alt="Product 1"
                className="w-full"
              />
            </Link>
            <div className="absolute bottom-3 inset-0 flex items-end justify-center">
              <button
                className="w-10/12 light-button opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                onClick={() => setOpen(true)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>

            <ModelProductComponent open={open} setOpen={setOpen} />
            <button className="absolute z-10 top-1 right-2 text-3xl font-bold hover:text-red-600">
              <CiHeart />
            </button>
          </div>
          <Link
            to={{ pathname: "/product" }}
            className="hover:no-underline hover:text-current"
          >
            <div className="p-2">
              <div className="flex flex-nowrap">
                <div className="m-1 justify-center">
                  <img src={color} alt="" className="w-6 h-6 rounded-full" />
                </div>
                <div className="m-1 justify-center">
                  <img src={color1} alt="" className="w-6 h-6 rounded-full" />
                </div>
              </div>
              <div className="flex flex-nowrap">
                <div className="price-card-product text-orange-600">
                  <p> &#8363;189.000</p>
                </div>
                <div className="price-card-product text-gray-500 line-through">
                  <p>&#8363;245.700</p>
                </div>
                <div className="cursor-pointer font-semibold bg-orange-50 m-1 text-orange-600">
                  <p>30%</p>
                </div>
              </div>

              <Link
                to={"/product"}
                className="hover:no-underline hover:text-current"
              >
                <p className="title-card-product">
                  Áo sơ mi nữ oversize cổ bẻ viền
                </p>
              </Link>
              <div className="flex">
                <Rate disabled defaultValue={2} className="text-sm" />
                <p> Đã bán 100 </p>
              </div>
            </div>
          </Link>
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default CardComponent;
