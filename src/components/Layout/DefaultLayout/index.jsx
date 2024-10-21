import React, { createContext, useEffect, useState } from "react";
import { App, ConfigProvider, Layout } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import { Content } from "antd/es/layout/layout";
import viVN from "antd/locale/vi_VN";
import { useLocation } from "react-router-dom";
import UserService from "../../../services/UserService";

export const FavoriteContext = createContext();

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const [keySearch, setKeySearch] = useState("");
  const [isFavorite, setIsFavorite] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await UserService.getFavorite();
        console.log("res", res.data);

        setIsFavorite(res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = (searchQuery) => {
    setKeySearch(searchQuery);
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { keySearch });
    }
    return child;
  });

  // In ra giá trị đường dẫn hiện tại để kiểm tra
  // console.log("Current Path:", location.pathname);

  return (
    <ConfigProvider locale={viVN}>
      <App notification={{ duration: 3, showProgress: true }}>
        <Layout>
          <Layout>
            <Header onSearch={handleSearch} />
            <FavoriteContext.Provider value={isFavorite}>
              <Content>{modifiedChildren}</Content>
            </FavoriteContext.Provider>
            {location.pathname !== "/cart" ? (
              <Footer />
            ) : (
              <div className="bg-gray-100 h-96"></div>
            )}
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
};

export default DefaultLayout;
