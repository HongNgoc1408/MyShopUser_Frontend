import React from "react";
import BannerComponent from "../../components/home/BannerComponent";
import banner1 from "../../assets/shop/banner1.jpg";
import banner2 from "../../assets/shop/banner2.jpg";
import banner3 from "../../assets/shop/banner6.jpg";
import banner4 from "../../assets/shop/banner7.png";
import BrandComponent from "../../components/home/BrandComponent";
import CardComponent from "../../components/home/CardComponent";
import { CiBoxList, CiFilter } from "react-icons/ci";
import { Checkbox } from "antd";

const AllProductPage = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="bg-gray-100">
      <BannerComponent
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
        banner4={banner4}
      />
      <BrandComponent />
      <div className="container max-lg:px-8 px-20">
        <div className="my-5">
          <div class="grid grid-cols-6 gap-6 py-5">
            <div className="">
              <div>
                <div className="flex flex-nowrap text-lg uppercase font-extrabold border-b-2 pb-2">
                  <div className="m-auto">
                    <CiBoxList />
                  </div>
                  <div className="m-auto">
                    <p>Tất cả danh mục</p>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <p className="text-lg">Thêm</p>
                </div>
              </div>

              <div className="flex flex-nowrap text-lg uppercase font-extrabold py-5">
                <div className="m-auto">
                  <CiFilter />
                </div>
                <div className="m-auto">
                  <p>Bộ lọc tìm kiếm</p>
                </div>
              </div>

              <div>
                <div className="text-lg capitalize py-2">Thương hiệu</div>
                <div className="flex flex-col border-b-2 pb-5">
                  <Checkbox onChange={onChange} className="text-lg">
                    Yame
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    IvyModa
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    FMStyle
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    YSL
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Gucci
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Channel
                  </Checkbox>
                </div>
              </div>

              <div>
                <div className="text-lg capitalize py-2">Danh mục</div>
                <div className="flex flex-col border-b-2 pb-5">
                  <Checkbox onChange={onChange} className="text-lg">
                    Áo thun
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Áo sơ mi
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Đầm
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Váy
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Quần
                  </Checkbox>
                  <Checkbox onChange={onChange} className="text-lg">
                    Bộ
                  </Checkbox>
                </div>
              </div>

              <div className="py-5 mx-auto justify-center items-center">
                <button className="default-button w-full uppercase">
                  <p className="relative z-10">Xóa tất cả</p>
                </button>
              </div>
            </div>

            <div className="col-span-5 ">
              <div className="flex text-lg uppercase font-extrabold border-b-2 pb-2">
                <div>Giá</div>
                <div>Chuyển trang</div>
              </div>

              <div className="grid grid-cols-5 gap-5 py-5">
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
        </div>
      </div>
    </div>
  );
};

export default AllProductPage;
