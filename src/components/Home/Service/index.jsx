import React from "react";
import {
  CiDeliveryTruck,
  CiDollar,
  CiHeadphones,
  CiShop,
  CiUndo,
} from "react-icons/ci";

const Service = () => {
  return (
    <div className="bg-Black">
      <div className="container mx-auto max-lg:px-8 px-20 border-b-2">
        <div className=" grid grid-cols-2 md:grid-cols-5 gap-5 py-5 ">
          <div className="flex flex-col items-center gap-5 bg-white py-5">
            <div
              className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
              role="presentation"
            >
              <CiDeliveryTruck />
            </div>
            <div className="">
              <p className="service-title">Vận chuyển toàn quốc</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 bg-white py-5">
            <div
              className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
              role="presentation"
            >
              <CiUndo />
            </div>
            <div className="">
              <p className="service-title">Tư vấn miễn phí</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 bg-white py-5">
            <div
              className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
              role="presentation"
            >
              <CiDollar />
            </div>
            <div className="">
              <p className="service-title">Thanh toán tiện lợi</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 bg-white py-5">
            <div
              className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
              role="presentation"
            >
              <CiHeadphones />
            </div>
            <div className="">
              <p className="service-title">Hỗ trợ 24/7</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 bg-white py-5">
            <div
              className="flex items-center justify-center w-[70px] h-[70px] bg-white border border-black rounded-full text-6xl text-navyBlue p-2.5"
              role="presentation"
            >
              <CiShop />
            </div>
            <div className="">
              <p className="service-title">Giao diện thân thiện</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
