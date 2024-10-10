import React from "react";
import BannerComponent from "../../components/home/BannerComponent";
import banner1 from "../../assets/shop/banner1.jpg";
import banner2 from "../../assets/shop/banner2.jpg";
import banner3 from "../../assets/shop/banner6.jpg";
import banner4 from "../../assets/shop/banner7.png";
import BrandComponent from "../../components/home/BrandComponent";
import AllProductComponent from "../../components/shop/AllProductComponent";

const AllProductPage = () => {
  return (
    <div className="bg-gray-100">
      <BannerComponent
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
        banner4={banner4}
      />
      <BrandComponent />
      <AllProductComponent />
    </div>
  );
};

export default AllProductPage;
