import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { Checkbox } from "antd";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";

const FilterComponent = () => {
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

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

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const res = await CategoryService.getAll();
        setCategorys(res.data);
      } catch (error) {
        console.error("Error fetching categorys:", error);
      }
    };

    fetchCategorys();
  }, []);
  return (
    <div className="col-span-1">
      {/* <div>
        <div className="flex flex-nowrap text-lg uppercase font-extrabold border-b-2 pb-2">
          <div className=" mr-1 m-auto">
            <CiBoxList />
          </div>
          <div className="m-auto">
            <p>Tất cả danh mục</p>
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-lg">Thêm</p>
        </div>
      </div> */}
      <div>
        <div className="flex flex-nowrap text-lg uppercase font-extrabold pb-5">
          <div className=" mr-1 m-auto">
            <CiFilter />
          </div>
          <div className="m-auto">
            <p>Bộ lọc tìm kiếm</p>
          </div>
        </div>

        <div>
          <div>
            <div className="text-lg capitalize pb-2 font-bold">Thương hiệu</div>
            <div className="flex flex-col border-b-2 pb-5">
              {brands.map((brand) => (
                <Checkbox
                  key={brand.id}
                  onChange={onChange}
                  className="text-lg"
                >
                  {brand.name}
                </Checkbox>
              ))}
            </div>
          </div>

          <div>
            <div className="text-lg capitalize py-2 font-bold">Danh mục</div>
            <div className="flex flex-col border-b-2 pb-5">
              {categorys.map((category) => (
                <Checkbox
                  key={category.id}
                  onChange={onChange}
                  className="text-lg"
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
          </div>

          <div className="py-5 mx-auto justify-center items-center">
            <button className="default-button w-full uppercase">
              <p className="relative z-10">Xóa tất cả</p>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-nowrap text-lg uppercase font-extrabold py-5">
        <div className="mr-1 m-auto">
          <CiFilter />
        </div>
        <div className="m-auto">
          <p>Bộ lọc tìm kiếm</p>
        </div>
      </div> */}
    </div>
  );
};

export default FilterComponent;
