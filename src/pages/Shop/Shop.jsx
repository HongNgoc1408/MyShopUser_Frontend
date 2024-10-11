import React from "react";
import banner1 from "../../assets/shop/banner1.jpg";
import banner2 from "../../assets/shop/banner2.jpg";
import banner3 from "../../assets/shop/banner6.jpg";
import banner4 from "../../assets/shop/banner7.png";
import Banner from "../../components/Home/Banner";
import Brand from "../../components/Home/Brand";
import AllProduct from "../../components/Shop/AllProduct";

const Shop = () => {
  return (
    <div className="bg-gray-100">
      <Banner
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
        banner4={banner4}
      />
      <Brand />
      <AllProduct />
    </div>
  );
};

export default Shop;
