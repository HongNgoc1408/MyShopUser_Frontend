import React from "react";
import {
  CiDeliveryTruck,
  CiDollar,
  CiHeadphones,
  CiUndo,
} from "react-icons/ci";

const ServiceComponent = () => {
  return (
    <div className="container max-lg:px-8 px-20">
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-5 bg-Black py-5">
          <div
            className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
            role="presentation"
          >
            <CiDeliveryTruck />
          </div>
          <div className="">
            <p className="service-title">Free Shipping</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 bg-Black py-5">
          <div
            className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
            role="presentation"
          >
            <CiUndo />
          </div>
          <div className="">
            <p className="service-title">Product Replace</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 bg-Black py-5">
          <div
            className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
            role="presentation"
          >
            <CiDollar />
          </div>
          <div className="">
            <p className="service-title">Emi Available</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 bg-Black py-5">
          <div
            className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
            role="presentation"
          >
            <CiHeadphones />
          </div>
          <div className="">
            <p className="service-title">24/7 Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
