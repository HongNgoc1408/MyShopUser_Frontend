import React from "react";
import BannerComponent from "../../components/DB/BannerComponent";
import BrandComponent from "../../components/DB/BrandComponent";
import ServiceComponent from "../../components/DB/ServiceComponent";
import ProductComponent from "../../components/DB/ProductComponent";
import banner1 from "../../assets/home/yody.jpg";
import banner2 from "../../assets/home/tokyolife.jpg";
import banner3 from "../../assets/home/lovito.jpg";
import banner4 from "../../assets/home/undercoon.jpg";
const Home = () => {
  return (
    <div className="bg-gray-100">
      <BannerComponent
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
        banner4={banner4}
      />
      <BrandComponent />
      <ProductComponent />
      <ServiceComponent />
    </div>
  );
};

export default Home;
