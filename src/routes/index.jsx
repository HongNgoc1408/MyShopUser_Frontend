import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import SendCodeRegisterPage from "../pages/auth/SendCodePage";
import HomePage from "../pages/home/HomePage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import AllProductPage from "../pages/shop/AllProductPage";

const routes = [
  {
    path: "/",
    name: "home",
    page: HomePage,
  },
  {
    path: "/login",
    name: "login",
    page: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    page: RegisterPage,
  },
  {
    path: "/send-code",
    name: "send-code",
    page: SendCodeRegisterPage,
  },
  {
    path: "/shop",
    name: "shop",
    page: AllProductPage,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
export { routes };
