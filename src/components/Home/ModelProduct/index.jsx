import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  Collapse,
  ConfigProvider,
  Form,
  Image,
  InputNumber,
  Modal,
  Rate,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { Option } from "antd/es/mentions";
import ProductService from "../../../services/ProductService";
import SizeService from "../../../services/SizeService";
import {
  formatDis,
  formatVND,
  toImageSrc,
} from "../../../services/commonService";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ModelProduct = ({ open, setOpen, id }) => {
  // const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [colorSizes, setColorSizes] = useState([]);
  const [selectedColorSize, setSelectedColorSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const carouselRef = useRef(null);

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
            return { ...colorSize, sizeInStocks: updatedSizeInStocks };
          })
        );

        setProduct(productData);
        setColorSizes(updatedColorSizes);
        setSelectedColorSize(updatedColorSizes[0]);

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
  };
  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleThumbnailClick = (index) => {
    // console.log(`Thumbnail clicked: ${index}`);
    carouselRef.current.goTo(index);
  };
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
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            titleFontSize: "20px",
          },
        },
      }}
    >
      <Modal
        title="Thêm vào giỏ hàng"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={950}
        styles={{
          body: {
            height: "500px",
            overflowY: "auto",
            overflowX: "hidden",
          },
          header: {
            textAlign: "center",
            borderBottom: "1px solid #999",
          },
        }}
      >
        <div className="grid grid-cols-5 gap-5 my-5">
          <div className="col-span-3 flex flex-row">
            <div className="w-1/4">
              {product.imageUrls && product.imageUrls.length > 0
                ? product.imageUrls.map((item, index) => (
                    <div className="" key={index}>
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
          <div className="col-span-2">
            <div className="flex">
              <p className="w-11/12 font-bold text-2xl">{product.name}</p>
              <button className="w-1/12 text-3xl justify-items-center">
                <CiHeart />
              </button>
            </div>

            <div className="flex">
              <div className="price-card-product text-orange-600">
                <p className="text-xl">
                  {product.discount > 0
                    ? formatVND(
                        (product.price * (100 - product.discount)) / 100
                      )
                    : formatVND(product.price)}
                </p>
              </div>
              <div className="price-card-product text-gray-500 line-through">
                <p className="text-xl">
                  {product.discount > 0 ? formatVND(product.price) : ""}
                </p>
              </div>
              <div className="cursor-pointer font-semibold bg-orange-50 mx-1 text-orange-600">
                <p className="text-xl">
                  {product.discount > 0 ? formatDis(product.discount) : ""}
                </p>
              </div>
            </div>
            <div className="flex">
              <Rate
                disabled
                defaultValue={product.rating > 0 ? product.rating : "0"}
                className="mx-1 my-auto p-auto text-lg"
              />
              <p className="mx-1 text-lg my-auto p-auto">Còn lại:</p>
              <p className="mx-1 text-lg  my-auto p-auto">
                {selectedColorSize &&
                  selectedSize &&
                  selectedColorSize.sizeInStocks.find(
                    (sizeStock) => sizeStock.sizeName === selectedSize
                  )?.inStock}

                {selectedSize ? ` |` : ""}
              </p>

              <p className="mx-1 my-auto p-auto text-lg">
                Đã bán: {product.sold > 0 ? product.sold : "0"}
              </p>
              {/* <p className="mr-1 my-auto p-auto text-lg">Còn lại: 33 | </p>
              <p className="my-auto p-auto text-lg">Đã bán: 97</p> */}
            </div>
            {selectedColorSize && (
              <>
                <div className="flex">
                  <p className="mr-1 text-lg">Màu sắc:</p>
                  <p className="text-lg mr-1">{selectedColorSize.colorName}</p>
                </div>
                <div className="flex flex-nowrap">
                  {colorSizes.map((colorSize, index) => (
                    <div
                      key={index}
                      className="m-1 cursor-pointer"
                      onClick={() => handleColorChange(colorSize)}
                    >
                      <Image
                        preview={false}
                        height={30}
                        width={30}
                        src={toImageSrc(colorSize.imageUrl)}
                        alt={`color-${index}`}
                        className={`rounded-full ${
                          selectedColorSize.colorName === colorSize.colorName
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <Form layout="horizontal" className="grid grid-cols-2 gap-2">
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
                        required
                        placeholder="Chọn kích thước"
                        className="w-full"
                        defaultValue={selectedSize}
                        onChange={handleSizeChange}
                      >
                        {selectedColorSize.sizeInStocks.map(
                          (sizeStock, sizeIndex) => (
                            <Option key={sizeIndex} value={sizeStock.sizeName}>
                              {sizeStock.sizeName}
                            </Option>
                          )
                        )}
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
                        min={1}
                        defaultValue={1}
                        className="w-full"
                      />
                    </Form.Item>
                  </Form>
                </div>
              </>
            )}

            {/* <div className="flex">
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
            </div> */}
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
      </Modal>
    </ConfigProvider>
  );
};
export default ModelProduct;
