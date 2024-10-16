import React, { useEffect, useState } from "react";
import { Pagination, Select } from "antd";
import CardProduct from "../../Home/CardProduct";
import Filter from "../../Product/Filter";
import ProductService from "../../../services/ProductService";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAll();
        // console.log("getAll", res.data);
        setProducts(res.data.items);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto max-lg:px-8 px-20">
      <div className="my-5">
        <div class="grid grid-cols-6 gap-6 py-5">
          <Filter />
          <div className="col-span-5">
            <div className="grid grid-cols-2 gap-2  text-base font-extrabold border-b-2 pb-2">
              <div className="flex col-start-1 col-end-3">
                <div className="mr-2">
                  <p>Sắp xếp theo</p>
                </div>
                <div className="mr-2">
                  <button className="border-2">Mới nhất</button>
                </div>
                <div className="mr-2">
                  <button className="border-2">Bán chạy</button>
                </div>
                <div className="mr-2">
                  <Select
                    defaultValue="Giá"
                    style={{
                      width: 120,
                    }}
                    allowClear
                    options={[
                      {
                        value: "Thấp đến Cao",
                        label: "Thấp đến Cao",
                      },
                      {
                        value: "Cao đến Thấp",
                        label: "Cao đến Thấp",
                      },
                    ]}
                    placeholder="Giá"
                  />
                </div>
              </div>

              <div className="col-end-6 col-span-2">
                <Pagination
                  simple={{
                    readOnly: true,
                  }}
                  defaultCurrent={2}
                  total={50}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 py-5">
              {products.map((product) => (
                <CardProduct key={product.id} id={product.id} />
              ))}
            </div>
            <div>
              <Pagination align="center" defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
