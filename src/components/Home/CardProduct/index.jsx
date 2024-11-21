import React, { useContext } from "react";
import { Badge, Image, Rate } from "antd";
import { Link } from "react-router-dom";
// import ModelProduct from "../ModelProduct";
import {
  formatDis,
  formatVND,
  toImageSrc,
} from "../../../services/commonService";
import UserService from "../../../services/UserService";
import { HeartFilled } from "@ant-design/icons";
import { FavoriteContext } from "../../../App";

const CardProduct = ({ product }) => {
  // const [open, setOpen] = useState(false);
  const { favoriteList, setFavoriteList } = useContext(FavoriteContext);
  const isFavorite = favoriteList.includes(product.id);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await UserService.deleteFavoriteProduct(product.id);
        setFavoriteList((prevFavorites) =>
          prevFavorites.filter((favId) => favId !== product.id)
        );
      } else {
        await UserService.addFavorite(product.id);
        setFavoriteList((prevFavorites) => [...prevFavorites, product.id]);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // console.log("product", product);

  return (
    <>
      {product.enable ? (
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
                <div className="w-full h-80 overflow-hidden">
                  <Image
                    preview={false}
                    src={product.imageUrl ? toImageSrc(product.imageUrl) : ""}
                    alt={product.name || "Product Image"}
                    className=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 10,
                    }}
                  />
                </div>

                <div className="absolute bottom-3 inset-0 flex items-end justify-center">
                  <button
                    className="w-10/12 light-button opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   setOpen(true);
                    // }}
                  >
                    Xem chi tiết sản phẩm
                  </button>
                </div>

                <div onClick={(e) => e.preventDefault()}>
                  {/* <ModelProduct open={open} setOpen={setOpen} id={product.id} /> */}
                  <button
                    className="absolute z-10 top-1 right-2 text-2xl font-bold"
                    onClick={toggleFavorite}
                  >
                    <HeartFilled
                      style={{ color: isFavorite ? "red" : "black" }}
                    />
                  </button>
                </div>
              </div>

              <div className="p-2 hover:no-underline hover:text-current">
                <div className="flex flex-nowrap">
                  {product.colorSizes && product.colorSizes.length > 0
                    ? product.colorSizes.map((item, index) => (
                        <div className="m-1 justify-center" key={index}>
                          <Image
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            // height={30}
                            // width={30}
                            preview={false}
                            src={toImageSrc(item.imageUrl)}
                            alt={`color-${index}`}
                            className="rounded-full"
                          />
                        </div>
                      ))
                    : ""}
                </div>
                <div className="flex flex-nowrap w-full">
                  <div className="price-card-product text-orange-600 mr-3">
                    <p>
                      {product.discount > 0
                        ? formatVND(
                            (product.price * (100 - product.discount)) / 100
                          )
                        : formatVND(product.price)}
                    </p>
                  </div>
                  <div className="price-card-product text-gray-500 line-through">
                    <p>
                      {product.discount > 0 ? formatVND(product.price) : ""}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="title-card-product hover:no-underline hover:text-current">
                    {product.name}
                  </p>
                </div>

                <div className="flex">
                  <div>
                    <Rate
                      disabled
                      defaultValue={product.rating > 0 ? product.rating : "5"}
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
            </div>
          </Badge.Ribbon>
        </Link>
      ) : null}
    </>
  );
};

export default CardProduct;
