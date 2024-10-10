import React from "react";
import TitleComponent from "../../components/home/TitleComponent";
import CardComponent from "./CardComponent";

const ProductComponent = () => {
  return (
    <div className="container mx-auto max-lg:px-8 px-20">
      <div className="my-5 p-5 bg-white shadow-md">
        <TitleComponent title="Thời trang" link="/" />
        <div className="grid lg:grid-cols-5 gap-5 sm:grid-cols-3 grid-cols-1 border-t-2 py-5">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
