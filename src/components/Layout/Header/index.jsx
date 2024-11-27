import React, { useContext, useState } from "react";
import {
  Dropdown,
  Avatar,
  Button,
  Col,
  Modal,
  Drawer,
  Input,
  Badge,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiMenuBurger, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import AuthAction from "../../../services/AuthAction";
import authService from "../../../services/authService";
import { AvatarContext, CountContext, useAuth } from "../../../App";
import { toImageLink } from "../../../services/commonService";

const Header = ({ onSearch }) => {
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const { count } = useContext(CountContext);
  const { avatar } = useContext(AvatarContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSearch = (value) => {
    onSearch(value);
    navigator("/shop");
    onClose();
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
  const items = [
    {
      key: "1",
      label: <Link to={"/profile"}>Thông tin</Link>,
    },
    {
      key: "2",
      label: <Link to={"/favorite"}>Yêu thích</Link>,
    },
    {
      key: "3",
      label: <Link to={"/order"}>Đơn đặt hàng</Link>,
    },
    {
      key: "4",
      label: (
        <div onClick={showModal} className="cursor-pointer">
          Đăng xuất
        </div>
      ),
    },
  ];

  const auth = [
    { key: "1", label: <Link to="/login">Đăng nhập</Link> },
    { key: "2", label: <Link to="/register">Đăng ký</Link> },
  ];

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
      <nav className="flex w-full items-center justify-between bg-zinc-50 py-2 shadow-md sticky top-0 z-50">
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
            <Col className="flex flex-col lg:flex-row text-base p-2 list-style-none me-auto ps-0 mx-auto">
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
              {/* 
              <Link
                to={"/"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/blog" ? "text-orange-500" : ""
                }`}
              >
                Bài viết
              </Link> */}

              <Link
                to={"/guide"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/about" ? "text-orange-500" : ""
                }`}
              >
                Hướng dẫn
              </Link>

              {/* <Link
                to={"/"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/contact" ? "text-orange-500" : ""
                }`}
              >
                Liên lạc
              </Link>
              <Link
                to={"/"}
                className={`flex text-lg p-2 cursor-pointer hover:text-orange-500 ${
                  location.pathname === "/contact" ? "text-orange-500" : ""
                }`}
              >
                Tuyển dụng
              </Link> */}
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
                  <Dropdown menu={{ items }} placement="bottomRight">
                    <Link
                      to={"/"}
                      className="flex text-base p-2 cursor-pointer"
                    >
                      {!avatar ? (
                        <Avatar src="avatar.png" size={30} fontWeight={800} />
                      ) : (
                        <Avatar
                          src={toImageLink(avatar)}
                          size={30}
                          fontWeight={800}
                        />
                      )}
                    </Link>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Dropdown menu={{ items : auth }} placement="bottomRight">
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
                <>
                  <Badge count={count.length} offset={[0, 0]} color="red">
                    <CiShoppingCart size={30} fontWeight={800} />
                  </Badge>
                </>
              </Link>
            </div>
          </Col>
        </div>
      </nav>

      <Drawer onClose={onClose} open={open} placement="top" height={150}>
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          allowClear
          onClear={() => setSearchValue("")}
        />
      </Drawer>
    </>
  );
};

export default Header;
