import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import TitleBody from "../../components/Home/TitleBody/TitleBody";
import CardProduct from "../../components/Home/CardProduct";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Favorites = () => {
  const [favorites, setFavorite] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const page = 1;
        const pageSize = 10;
        const keySearch = "";
        const res = await UserService.getFavoriteProduct(
          page,
          pageSize,
          keySearch
        );
        console.log(res.data.items);
        setFavorite(res.data.items);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);
  
  return (
    <div className="container mx-auto max-lg:px-8 px-20">
      <div className="my-5 p-5 bg-white shadow-md">
        <TitleBody title="Sản phẩm yêu thích" link="" />
        {favorites.length > 0 ? (
          <>
            <div className="grid lg:grid-cols-5 gap-5 sm:grid-cols-3 grid-cols-1 border-t-2 py-5">
              {favorites.map((favorite) => (
                <CardProduct key={favorite.id} product={favorite} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <Result
              icon={<SmileOutlined />}
              title="Không tìm thấy sản phẩm yêu thích của bạn!"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
