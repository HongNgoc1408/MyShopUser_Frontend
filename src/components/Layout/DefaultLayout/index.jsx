import React from "react";
// import Sidebar from "../Sidebar";
import { App, ConfigProvider, Layout } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import { Content } from "antd/es/layout/layout";
import viVN from "antd/locale/vi_VN";
import { useLocation } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  // In ra giá trị đường dẫn hiện tại để kiểm tra
  console.log("Current Path:", location.pathname);
  return (
    <ConfigProvider locale={viVN}>
      <App notification={{ duration: 3, showProgress: true }}>
        <Layout>
          <Layout>
            <Header />
            <Content>{children}</Content>
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
