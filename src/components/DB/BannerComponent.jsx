import React, { useRef } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const BannerComponent = ({
  // link1,
  // link2,
  // link3,
  // link4,
  banner1,
  banner2,
  banner3,
  banner4,
}) => {
  const carouselRef = useRef(null);
  return (
    <div>
      <Carousel autoplay ref={carouselRef} infinite={false}>
        <div>
          <Link>
            <img src={banner1} alt="banner1" className="w-full max-h-[500px]" />
          </Link>
        </div>
        <div>
          <Link>
            <img src={banner2} alt="banner2" className="w-full max-h-[500px]" />
          </Link>
        </div>
        <div>
          <Link>
            <img src={banner3} alt="banner3" className="w-full max-h-[500px]" />
          </Link>
        </div>
        <div>
          <Link>
            <img src={banner4} alt="banner4" className="w-full max-h-[500px]" />
          </Link>
        </div>
      </Carousel>
    </div>
  );
};
export default BannerComponent;
