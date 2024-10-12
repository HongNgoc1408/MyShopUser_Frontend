import React, { useRef, useState, useEffect } from "react";
import { Carousel, Image } from "antd";
import { Link } from "react-router-dom";

import BrandService from "../../../services/BrandService";
import { toImageSrc } from "../../../services/commonService";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Brand = () => {
  const carouselRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(6);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await BrandService.getAll();
        setBrands(res.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesToShow(6);
    } else if (width >= 768) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(2);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

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
    <div className="container mx-auto px-4 lg:px-20">
      <div className="relative my-5 p-5 ps-14 bg-white shadow-md">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center opacity-70 hover:opacity-100 z-10"
          aria-label="Previous Slide"
        >
          <ArrowLeftOutlined />
        </button>

        <Carousel
          ref={carouselRef}
          slidesToShow={slidesToShow}
          infinite={false}
        >
          {brands.map((brand) => (
            <Link key={brand.id}>
              <Image
                preview={false}
                width={180}
                height={180}
                src={toImageSrc(brand.imageUrl)}
                alt={brand.name}
              />
            </Link>
          ))}
        </Carousel>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center opacity-70 hover:opacity-100"
          aria-label="Next Slide"
        >
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
};

export default Brand;
