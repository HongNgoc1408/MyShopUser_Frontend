import React, { useEffect, useState } from "react";
import TitleBody from "../TitleBody/TitleBody";
import CardProduct from "../CardProduct";
import ProductService from "../../../services/ProductService";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // console.log("Product", keySearch);
    const fetchProducts = async () => {
      try {
        const page = 1;
        const pageSize = 10;
        const keySearch = "";
        const res = await ProductService.getAll(page, pageSize, keySearch);

        // console.log(res.data.items);
        setProducts(res.data.items || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto max-lg:px-8 px-20">
      <div className="my-5 p-5 bg-white shadow-md">
        <TitleBody title="Thời trang" link="/shop" />
        {products.length > 0 ? (
          <>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 border-t-2 py-5">
              {products.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <Result
              icon={<SmileOutlined />}
              title="Không tìm thấy sản phẩm bạn cần tìm!"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
