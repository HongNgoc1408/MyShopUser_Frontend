import React, { useState } from "react";
import { Badge, Image } from "antd";

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
        className="text-base "
      >
        <div className="border-2 hover:shadow-md">
          <div className="relative flex group">
            <Link to={"/product"}>
              <Image
                preview={false}
                src={product}
                alt="Product 1"
                className="w-full"
              />
            </Link>
            <button
              className="light-button absolute bottom-2 right-10 invisible group-hover:visible"
              onClick={() => setOpen(true)}
            >
              Thêm vào giỏ hàng
            </button>

            <ModelProductComponent open={open} setOpen={setOpen} />
            <button className="absolute z-10 top-1 right-2 text-3xl font-bold hover:text-red-600">
              <CiHeart />
            </button>
          </div>

          <div className="p-2">
            <div className="flex flex-nowrap">
              <div className="m-1 justify-center">
                <img src={color} alt="" className="w-6 h-6 rounded-full" />
              </div>
              <div className="m-1 justify-center">
                <img src={color1} alt="" className="w-6 h-6 rounded-full" />
              </div>
            </div>
            <p className="price-card-product">189.000 VND</p>
            <Link>
              <p className="title-card-product">
                Áo sơ mi nữ oversize cổ bẻ viền
              </p>
            </Link>
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default CardComponent;
