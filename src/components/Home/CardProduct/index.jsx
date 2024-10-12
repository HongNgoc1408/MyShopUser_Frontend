import React, { useEffect, useState } from "react";
import { Badge, Image, Rate } from "antd";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import ModelProduct from "../ModelProduct";
import ProductService from "../../../services/ProductService";
import {
  formatDis,
  formatVND,
  toImageSrc,
} from "../../../services/commonService";
const CardProduct = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.getById(id);
        // console.log("getById", res.data);
        setProduct(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Link
      to={`/product-details/${product.id}`}
      className="z-10 hover:no-underline hover:text-current"
    >
      <Badge.Ribbon
        text={formatDis(product.discount)}
        color="red"
        placement="start"
        className={`text-base z-10 cursor-pointer ${
          product.discount > 0 ? "" : "hidden"
        }`}
      >
        <div className="border-2 hover:shadow-md">
          <div className="relative group">
            {/* <Link
              to={`/product-details/${product.id}`}
              className="z-10 hover:no-underline hover:text-current"
            > */}
            <Image
              preview={false}
              src={
                product.imageUrls && product.imageUrls.length > 0
                  ? toImageSrc(product.imageUrls[0])
                  : ""
              }
              alt={product.name || "Product Image"}
              style={{
                width: "100%",
                height: "380px",
                objectFit: "cover",
              }}
            />
            {/* </Link> */}
            <div className="absolute bottom-3 inset-0 flex items-end justify-center">
              <button
                className="w-10/12 light-button opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>

            <div onClick={(e) => e.preventDefault()}>
              <ModelProduct open={open} setOpen={setOpen} id={product.id} />
              <button className="absolute z-10 top-1 right-2 text-3xl font-bold hover:text-red-600">
                <CiHeart />
              </button>
            </div>
          </div>
          <Link
            to={`/product-details/${product.id}`}
            className="hover:no-underline hover:text-current"
          >
            <div className="p-2">
              <div className="flex flex-nowrap">
                {product.colorSizes && product.colorSizes.length > 0
                  ? product.colorSizes.map((item, index) => (
                      <div className="m-1 justify-center" key={index}>
                        <Image
                          height={30}
                          width={30}
                          preview={false}
                          src={toImageSrc(item.imageUrl)}
                          alt={`color-${index}`}
                          className="rounded-full"
                        />
                      </div>
                    ))
                  : ""}
              </div>
              <div className="flex flex-nowrap">
                <div className="price-card-product text-orange-600">
                  <p>
                    {product.discount > 0
                      ? formatVND(
                          (product.price * (100 - product.discount)) / 100
                        )
                      : formatVND(product.price)}
                  </p>
                </div>
                <div className="price-card-product text-gray-500 line-through">
                  <p>{product.discount > 0 ? formatVND(product.price) : ""}</p>
                </div>
                <div className="cursor-pointer font-semibold bg-orange-50 m-1 text-orange-600">
                  <p>
                    {product.discount > 0 ? formatDis(product.discount) : ""}
                  </p>
                </div>
              </div>

              <Link
                to={`/product-details/${product.id}`}
                className="hover:no-underline hover:text-current"
              >
                <p className="title-card-product">{product.name}</p>
              </Link>
              <div className="flex">
                <div>
                  <Rate
                    disabled
                    defaultValue={product.rating > 0 ? product.rating : "0"}
                    className="text-sm"
                  />
                </div>

                <div>
                  <p className="text-sm mx-2">
                    Đã bán: {product.sold > 0 ? product.sold : "0"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Badge.Ribbon>
    </Link>
  );
};

export default CardProduct;
