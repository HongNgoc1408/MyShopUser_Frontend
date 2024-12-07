import React from "react";
import banner1 from "../../assets/home/yody.jpg";
import banner2 from "../../assets/home/tokyolife.jpg";
import banner3 from "../../assets/home/lovito.jpg";
import banner4 from "../../assets/home/undercoon.jpg";
import Banner from "../../components/Home/Banner";
import Brand from "../../components/Home/Brand";
import Service from "../../components/Home/Service";
import Product from "../../components/Home/Product";
const Home = () => {
  // console.log("keySearchHome", keySearch);
  return (
    <div className="bg-gray-100">
      <Banner
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
        banner4={banner4}
      />

      <Brand />
      <Product />
      <Service />
    </div>
  );
};

export default Home;
