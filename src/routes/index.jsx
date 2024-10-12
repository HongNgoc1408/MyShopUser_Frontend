import React, { Fragment } from "react";
import { Navigate, Route } from "react-router-dom";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop/Shop";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import CartDetail from "../pages/Cart/CartDetail";
import ProductDetail from "../pages/Product/ProductDetail";

export const navigation = [{ name: "Home", to: "/" }];

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/reset-password", component: ResetPassword },
  { path: "/shop", component: Shop },
  { path: "/product-details/:id", component: ProductDetail },
];

export const privateRoutes = [
  // { path: "/cart", component: Cart },
  { path: "/cart", component: CartDetail },
  { path: "/profile", component: Profile },
];

export const generatePublicRoutes = () => {
  return publicRoutes.map((route, index) => {
    const Page = route.component;
    let Layout = DefaultLayout;

    if (route.Layout) {
      Layout = route.Layout;
    } else if (route.Layout === null) {
      Layout = Fragment;
    }
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  });
};

export const generatePrivateRoutes = (isAuthenticated) => {
  // console.log(isAuthenticated)
  if (isAuthenticated) {
    return privateRoutes.map((route, index) => {
      const Page = route.component;
      let Layout = DefaultLayout;

      if (route.Layout) {
        Layout = route.Layout;
      } else if (route.Layout === null) {
        Layout = Fragment;
      }
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  } else {
    return privateRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={<Navigate to="/login" />} />
    ));
  }
};
