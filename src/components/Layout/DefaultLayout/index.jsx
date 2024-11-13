import React, { useState } from "react";
import { App, ConfigProvider, Layout } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import { Content } from "antd/es/layout/layout";
import viVN from "antd/locale/vi_VN";
import { useLocation } from "react-router-dom";


const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const [keySearch, setKeySearch] = useState("");

  const handleSearch = (searchQuery) => {
    setKeySearch(searchQuery);
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { keySearch });
    }
    return child;
  });

  return (
    <ConfigProvider locale={viVN}>
      <App notification={{ duration: 3, showProgress: true }}>
        <Layout>
          <Layout>
            <Header onSearch={handleSearch} />
            <Content>{modifiedChildren}</Content>
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
