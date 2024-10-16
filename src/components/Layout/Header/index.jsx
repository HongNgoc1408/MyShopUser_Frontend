import React, { useEffect, useState } from "react";
import {
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Button,
  Col,
  Modal,
  Drawer,
  Input,
  Spin,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { CiMenuBurger, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import AuthAction from "../../../services/AuthAction";
import authService from "../../../services/authService";
import { useAuth } from "../../../App";
import CartService from "../../../services/CartService";
import { showError } from "../../../services/commonService";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [username, setUsername] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const user = authService.getCurrentUser()
  //   user ? setUsername(user.name) : setUsername('')
  // }, [state.isAuthenticated])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await CartService.count();
        // console.log("OrderService", res.data);
        setData(res.data);
      } catch (error) {
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleLogout = () => {
    dispatch(AuthAction.LOGOUT);
    authService.logout();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/profile"}>Thông tin</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/favorite"}>Yêu thích</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/order"}>Đơn đặt hàng</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <div onClick={showModal} className="cursor-pointer">
          Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );
  const auth = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/login">Đăng nhập</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/register">Đăng ký</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Modal
        title="Xác nhận đăng xuất"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
      <nav className="flex w-full items-center justify-between bg-zinc-50 py-2 shadow-md sticky top-0 z-50 ">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <Button
            className="lg:hidden text-black/50 "
            icon={<CiMenuBurger />}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          />
          <Col span={4} offset={2} className="flex text-base p-2">
            <Link to={"/"} className="flex items-center cursor-pointer">
              <img
                src="/logoHCN.png"
                alt=""
                className="lg:w-1/2 md:w-2/3 sm:w-3/4"
              />
            </Link>
          </Col>
          <div
            className={`${
              collapsed ? "hidden" : "flex"
            } flex-grow basis-full items-cente r lg:flex lg:basis-auto`}
          >
            <Col className="flex flex-col lg:flex-row text-base p-2 list-style-none me-auto ps-0">
              <Link
                to={"/"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/" ? "text-orange-500" : ""
                }`}
              >
                Trang chủ
              </Link>

              <Link
                to={"/shop"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/product" ? "text-orange-500" : ""
                }`}
              >
                Sản phẩm
              </Link>

              <Link
                to={"/blog"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/blog" ? "text-orange-500" : ""
                }`}
              >
                Bài viết
              </Link>

              <Link
                to={"/about"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/about" ? "text-orange-500" : ""
                }`}
              >
                Về chúng tôi
              </Link>

              <Link
                to={"/contact"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/contact" ? "text-orange-500" : ""
                }`}
              >
                Liên lạc
              </Link>
            </Col>
          </div>
          <Col span={4} offset={2}>
            <div className="flex items-center">
              <Link
                className="flex text-base p-2 cursor-pointer"
                onClick={showDrawer}
              >
                <CiSearch size={30} fontWeight={800} />
              </Link>

              {state.isAuthenticated ? (
                <>
                  <Dropdown overlay={menu} placement="bottomRight">
                    <Link
                      href="/"
                      className="flex text-base p-2 cursor-pointer"
                    >
                      <Avatar
                        src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/b94eafde-25f5-41ff-a6c4-63786bf80377/5602cc0f-4caf-460b-8b30-84eb53ad6527.png"
                        size={30}
                        fontWeight={800}
                      />
                    </Link>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Dropdown overlay={auth} placement="bottomRight">
                    <Link
                      to={"/"}
                      className="flex text-base p-2 cursor-pointer"
                    >
                      <CiUser size={30} fontWeight={800} />
                    </Link>
                  </Dropdown>
                </>
              )}

              <Link
                to={"/cart"}
                className={`flex text-base p-2 cursor-pointer ${
                  location.pathname === "/cart"
                    ? "text-orange-300"
                    : "text-sky-700"
                }`}
              >
                {!isLoading ? (
                  <>
                    <Badge count={data} offset={[0, 0]} color="red">
                      <CiShoppingCart size={30} fontWeight={800} />
                    </Badge>
                  </>
                ) : (
                  <Spin />
                )}
              </Link>
            </div>
          </Col>
        </div>
      </nav>

      <Drawer onClose={onClose} open={open} placement="top" height={150}>
        <Input.Search placeholder="Tìm kiếm" size="large" />
      </Drawer>
    </>
  );
};

export default Header;
