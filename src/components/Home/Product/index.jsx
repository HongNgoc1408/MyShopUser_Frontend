import React, { useEffect, useState } from "react";
import TitleBody from "../TitleBody/TitleBody";
import CardProduct from "../CardProduct";
import ProductService from "../../../services/ProductService";

const Product = () => {
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
      <div className="my-5 p-5 bg-white shadow-md">
        <TitleBody title="Thời trang" link="/shop" />
        <div className="grid lg:grid-cols-5 gap-5 sm:grid-cols-3 grid-cols-1 border-t-2 py-5">
          {products.map((product) => (
            <CardProduct key={product.id} id={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
