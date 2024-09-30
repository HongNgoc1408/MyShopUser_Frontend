// BrandComponent.jsx
import React, { useRef } from "react";
import { Carousel, Image } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import brand from "../../assets/brand/upZ.webp";
import brand1 from "../../assets/brand/LV.png";
import brand2 from "../../assets/brand/canifa.webp";
import brand3 from "../../assets/brand/FM.png";
import brand4 from "../../assets/brand/yody.png";
import brand5 from "../../assets/brand/gucci.png";

const BrandComponent = () => {
  const carouselRef = useRef(null);

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  return (
    <div className="container max-lg:px-8 px-20">
      <div className="relative my-5 p-5 ps-14 bg-white shadow-md">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center opacity-70 hover:opacity-100 z-10"
          aria-label="Previous Slide"
        >
          <LeftOutlined />
        </button>
        <Carousel ref={carouselRef} slidesToShow={5} infinite={false}>
          <>
            <Link to="/brand/1">
              <Image
                preview={false}
                width={215}
                height={215}
                src={brand}
                alt="Brand 1"
              />
            </Link>
          </>
          <>
            <Link to="/brand/2">
              <Image
                preview={false}
                width={215}
                height={215}
                src={brand1}
                alt="Brand 2"
              />
            </Link>
          </>
          <>
            <Link to="/brand/3">
              <Image
                preview={false}
                width={215}
                height={215}
                src={brand2}
                alt="Brand 3"
              />
            </Link>
          </>
          <>
            <Link to="/brand/4">
              <Image
                preview={false}
                width={215}
                height={215}
                src={brand3}
                alt="Brand 4"
              />
            </Link>
          </>
          <>
            <Link to="/brand/5">
              <Image
                preview={false}
                width={215}
                height={215}
                src={brand4}
                alt="Brand 5"
              />
            </Link>
          </>
          <>
            <Link to="/brand/6">
              <Image
                preview={false}
                width={215}
                height={215}
                src={brand5}
                alt="Brand 6"
              />
            </Link>
          </>
        </Carousel>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center opacity-70 hover:opacity-100"
          aria-label="Next Slide"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default BrandComponent;
