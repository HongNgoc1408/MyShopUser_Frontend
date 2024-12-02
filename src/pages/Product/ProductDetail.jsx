import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Carousel,
  Collapse,
  ConfigProvider,
  Form,
  Image,
  InputNumber,
  notification,
  Rate,
  Select,
} from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Tabs } from "antd";
import ProductService from "../../services/ProductService";
import {
  formatDis,
  formatVND,
  showError,
  toImageSrc,
} from "../../services/commonService";
import SizeService from "../../services/SizeService";
import CartService from "../../services/CartService";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import Review from "../Review";
import { HeartOutlined } from "@ant-design/icons";

import UserService from "../../services/UserService";
import { CountContext, FavoriteContext } from "../../App";
import BuyingGuide from "../BuyingGuide";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const carouselRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isAddCart, setIsAddCart] = useState(false);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [colorSizes, setColorSizes] = useState([]);
  const [selectedColorSize, setSelectedColorSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { favoriteList, setFavoriteList } = useContext(FavoriteContext);
  const { count, setCount } = useContext(CountContext);
  const isFavorite = favoriteList.includes(product.id);

  const productName =
    queryParams.get("name") || product.name || "Sản phẩm không tên";

  const breadcrumb = (id, name) => [
    {
      path: "/",
      title: "Trang chủ",
    },
    {
      path: "/shop",
      title: "Sản phẩm",
    },
    {
      title: <span className="capitalize">{name}</span>,
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.getById(id);

        const productData = res.data;
        // console.log(res.data);

        const updatedColorSizes = await Promise.all(
          productData.colorSizes.map(async (colorSize) => {
            const updatedSizeInStocks = await Promise.all(
              colorSize.sizeInStocks.map(async (sizeStock) => {
                if (!sizeStock.sizeName) {
                  const size = await SizeService.getById(sizeStock.sizeId);
                  // console.log(size.data);
                  return {
                    ...sizeStock,
                    sizeName: size ? size.data.name : "Unknown",
                  };
                }
                return sizeStock;
              })
            );

            // const filteredSizeInStocks = updatedSizeInStocks.filter(
            //   (sizeStock) => sizeStock.inStock > 0
            // );

            // return { ...colorSize, sizeInStocks: filteredSizeInStocks };
            return { ...colorSize, sizeInStocks: updatedSizeInStocks };
          })
        );

        setProduct(productData);
        setColorSizes(updatedColorSizes);
        setSelectedColorSize(updatedColorSizes[0]);

        // console.log(updatedColorSizes[0]);
        if (updatedColorSizes[0]?.sizeInStocks.length > 0) {
          setSelectedSize(updatedColorSizes[0].sizeInStocks[0].sizeName);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorChange = (colorSize) => {
    setSelectedColorSize(colorSize);
    // console.log(colorSize);
    // if (colorSize.sizeInStocks.length > 0) {
    //   setSelectedSize(colorSize.sizeInStocks[0].sizeName);
    // } else {
    //   setSelectedSize(null);
    // }
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleThumbnailClick = (index) => {
    // console.log(`Thumbnail clicked: ${index}`);
    carouselRef.current.goTo(index);
  };

  const onChange = (key) => {
    // console.log(key);
  };
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
  const items = [
    {
      key: "1",
      label: "Chính sách vận chuyển",
      children: (
        <div>Ưu đãi miễn phí vận chuyển cho đơn hàng của từ 500,000 VNĐ</div>
      ),
    },
    {
      key: "2",
      label: "Bảo hành và đổi trả",
      children: (
        <div>
          Miễn phí Trả hàng trong 15 ngày nếu Đổi ý (hàng trả phải còn nguyên
          seal, tem, hộp sản phẩm), áp dụng cho một số sản phẩm nhất định. Ngoài
          ra, tại thời điểm nhận hàng, bạn có thể đồng kiểm và được trả hàng
          miễn phí.
        </div>
      ),
    },
  ];

  const onChange1 = (key) => {
    // console.log(key);
  };

  const items1 = [
    {
      key: "1",
      label: (
        <>
          <span className="uppercase text-lg">Mô tả sản phẩm</span>
        </>
      ),
      children: (
        <>
          <div className="text-lg">
            <div className="mb-4">
              <div className="font-bold mb-4">* THÔNG TIN SẢN PHẨM</div>
              <div>
                {product.description ? (
                  product.description
                    .split("\n")
                    .map((item) => item.trim())
                    .filter((item) => item)
                    .map((item, index) => (
                      <div key={index} className="flex items-start mb-1">
                        <span>{item}</span>
                      </div>
                    ))
                ) : (
                  <span>Chưa có thông tin sản phẩm</span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-bold mb-4">
                * HƯỚNG DẪN CHỌN SIZE CHO BẠN
              </div>
              <div>
                {product.guideSize ? (
                  product.guideSize
                    .split("\n")
                    .map((item) => item.trim())
                    .filter((item) => item)
                    .map((item, index) => (
                      <div key={index} className="flex items-start mb-1">
                        <span>{item}</span>
                      </div>
                    ))
                ) : (
                  <span>Chưa có hướng dẫn chọn size sản phẩm</span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-bold mb-4">
                * HƯỚNG DẪN BẢO QUẢN VÀ SỬ DỤNG
              </div>
              <div>
                {product.care ? (
                  product.care
                    .split("\n")
                    .map((item) => item.trim())
                    .filter((item) => item)
                    .map((item, index) => (
                      <div key={index} className="flex items-start mb-1">
                        <span>{item}</span>
                      </div>
                    ))
                ) : (
                  <span>Chưa có hướng dẫn bảo quản sản phẩm</span>
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <span className="uppercase text-lg">Đánh giá sản phẩm</span>
        </>
      ),
      children: (
        <>
          <Review id={id} rating={product.rating} />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <span className="uppercase text-lg">Hướng dẫn mua hàng</span>
        </>
      ),
      children: (
        <>
          <BuyingGuide />
        </>
      ),
    },
  ];

  const addToCart = async () => {
    setIsAddCart(true);
    try {
      const sizeInStock = selectedColorSize.sizeInStocks.find(
        (sizeStock) => sizeStock.sizeName === selectedSize
      );

      if (!sizeInStock) {
        notification.error({
          message: "Vui lòng chọn kích thước hợp lệ.",
          placement: "top",
        });
        return;
      }

      const cartItem = {
        productId: id,
        sizeId: sizeInStock.sizeId,
        colorId: selectedColorSize.id,
        quantity: quantity,
      };
      // console.log(cartItem);
      await CartService.add(cartItem);

      const isProductInCart = count.some((productId) => productId === id);
      if (!isProductInCart) setCount((prev) => [...prev, id]);

      notification.success({
        message: "Thêm vào giỏ hàng thành công.",
        placement: "top",
      });
    } catch (error) {
      if (error.response?.status === 401) {
        notification.error({
          message: error.response.data || "Bạn chưa đăng nhập tài khoản!",
          placement: "top",
        });
        navigate("/login");
      } else {
        showError(error);
        // notification.error({
        //   message: "Có lỗi xảy ra, vui lòng thử lại sau.",
        //   error,
        // });
      }
    } finally {
      setIsAddCart(false);
    }
  };

  return (
    <div className="container mx-auto max-lg:px-8 px-24">
      <div className="my-5">
        <BreadcrumbLink breadcrumb={breadcrumb(id, productName)} />
        <div className="grid grid-cols-5 gap-5 my-5">
          <div className="col-span-3 flex flex-row">
            <div className="w-1/4">
              {product.imageUrls && product.imageUrls.length > 0
                ? product.imageUrls.map((item, index) => (
                    <div key={index}>
                      <Image
                        preview={false}
                        style={{ width: "58%" }}
                        src={toImageSrc(item)}
                        alt={product.name}
                        className="mx-auto cursor-pointer"
                        onClick={() => handleThumbnailClick(index)}
                      />
                    </div>
                  ))
                : ""}
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
                <Carousel
                  ref={carouselRef}
                  dotPosition="right"
                  arrows
                  infinite={false}
                >
                  {product.imageUrls && product.imageUrls.length > 0
                    ? product.imageUrls.map((item, index) => (
                        <div className="mx-1" key={index}>
                          <Link>
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              preview={false}
                              src={toImageSrc(item)}
                              alt={product.name}
                              className="w-full"
                            />
                          </Link>
                        </div>
                      ))
                    : ""}
                </Carousel>
              </ConfigProvider>
            </div>
          </div>
          <div className="col-span-2 ml-10">
            <div className="flex">
              <p className="w-11/12 font-bold text-2xl capitalize">
                {product.name}
              </p>
              <button
                onClick={toggleFavorite}
                className="w-1/12 text-3xl justify-items-center"
              >
                <HeartOutlined
                  style={{ color: isFavorite ? "red" : "black" }}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex">
                <div className="price-card-product text-orange-600">
                  <p className="text-2xl">
                    {product.discount > 0
                      ? formatVND(
                          (product.price * (100 - product.discount)) / 100
                        )
                      : formatVND(product.price)}
                  </p>
                </div>
                <div className="price-card-product text-gray-500 line-through">
                  <p className="text-2xl">
                    {product.discount > 0 ? formatVND(product.price) : ""}
                  </p>
                </div>
                <div className="cursor-pointer font-semibold bg-orange-50 m-1 text-orange-600">
                  <p className="text-xl">
                    {product.discount > 0 ? formatDis(product.discount) : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <Rate
                disabled
                defaultValue={product.rating > 0 ? product.rating : "0"}
                className="mx-1 my-auto p-auto text-xl"
              />
              <p className="mx-1 text-xl my-auto p-auto">Còn lại:</p>
              <p className="mx-1 text-xl my-auto p-auto text-orange-600 flex">
                {selectedColorSize &&
                  selectedSize &&
                  selectedColorSize.sizeInStocks.find(
                    (sizeStock) => sizeStock.sizeName === selectedSize
                  )?.inStock}

                <span className="text-black">{selectedSize ? ` | ` : ""}</span>
              </p>

              <p className="mx-1 my-auto p-auto text-xl flex">
                Đã bán:
                <span className="text-orange-600 ml-2">
                  {product.sold > 0 ? product.sold : "0"}
                </span>
              </p>
            </div>
            {selectedColorSize && (
              <>
                <div className="flex">
                  <p className="mr-1 text-lg">Màu sắc:</p>
                  <p className="text-lg mr-1 font-semibold">
                    {selectedColorSize.colorName}
                  </p>
                </div>
                <div className="flex flex-nowrap">
                  {colorSizes.map((colorSize, index) => (
                    <div
                      key={index}
                      className={`m-1 pt-1 px-1 cursor-pointer rounded-3xl ${
                        selectedColorSize.colorName === colorSize.colorName
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                      onClick={() => handleColorChange(colorSize)}
                    >
                      <Image
                        preview={false}
                        style={{ width: "30px", height: "30px" }}
                        // height={30}
                        // width={30}
                        src={toImageSrc(colorSize.imageUrl)}
                        alt={`color-${index}`}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <Form
                    layout="horizontal"
                    className="grid grid-cols-2 gap-2"
                    initialValues={{
                      [`size-${selectedColorSize.colorName}`]: selectedSize,
                      [`inStock-${selectedColorSize.colorName}`]: quantity || 1,
                    }}
                  >
                    <Form.Item
                      className="m-2"
                      name={`size-${selectedColorSize.colorName}`}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn kích thước",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        optionFilterProp="label"
                        required
                        placeholder="Chọn kích thước"
                        className="w-full"
                        onChange={handleSizeChange}
                      >
                        {selectedColorSize.sizeInStocks
                          .filter((sizeStock) => sizeStock.inStock > 0)
                          .map((sizeStock, sizeIndex) => (
                            <Select.Option
                              key={sizeIndex}
                              value={sizeStock.sizeName}
                              label={sizeStock.sizeName}
                            >
                              {sizeStock.sizeName}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={`inStock-${selectedColorSize.colorName}`}
                      className="m-2"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn số lượng",
                        },
                      ]}
                    >
                      <InputNumber
                        max={selectedColorSize.inStock}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        min={1}
                        className="w-full"
                      />
                    </Form.Item>
                  </Form>
                </div>
              </>
            )}

            <div className="w-full text-left my-4">
              <button
                onClick={addToCart}
                // loading={isAddCart}
                disabled={isAddCart}
                className="dark-button text-base flex justify-center items-center gap-2 w-full py-5 px-4 font-bold rounded-md lg:m-0 md:px-6"
              >
                {isAddCart ? "Đang thêm vào giỏ..." : "Thêm vào giỏ hàng"}
              </button>
            </div>
            {/* <div className="w-full text-left my-4">
              <button className=" light-button border-2 text-base flex justify-center items-center gap-2 w-full py-5 px-4 font-bold rounded-md lg:m-0 md:px-6">
                <span className="relative z-10">Mua ngay</span>
              </button>
            </div> */}
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
        <div className="ml-10 text-2xl">
          <Tabs defaultActiveKey="1" items={items1} onChange={onChange1} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
