import React, { useState } from "react";
import { Menu, Dropdown, Avatar, Badge, Button, Col } from "antd";
import { Link } from "react-router-dom";
import { CiMenuBurger, CiSearch, CiShoppingCart } from "react-icons/ci";
import logo from "../../assets/logoHCN.png";
const HeaderComponent = ({ showDrawer }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const menu1 = (
    <Menu>
      <Menu.Item key="1">Thông tin</Menu.Item>
      <Menu.Item key="2">Yêu thích</Menu.Item>
      <Menu.Item key="3">Đơn hàng</Menu.Item>
      <Menu.Item key="4">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <nav className="flex w-full items-center justify-between bg-zinc-50 py-2 shadow-md sticky top-0 z-50 ">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <Button
          className="lg:hidden text-black/50 "
          icon={<CiMenuBurger />}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        />
        <Col span={6} offset={2} className="flex text-base p-2">
          <Link to={"/"} className="flex items-center cursor-pointer">
            <img src={logo} alt="" className="lg:w-1/2" />
          </Link>
        </Col>
        <div
          className={`${
            collapsed ? "hidden" : "flex"
          } flex-grow basis-full items-center lg:flex lg:basis-auto`}
        >
          <Col
            span={6}
            className="flex flex-col lg:flex-row text-base p-2 list-style-none me-auto ps-0 "
          >
            {/* <Link className="flex text-lg p-2 cursor-pointer">Home</Link> */}
            <Link to={"/shop"} className="flex text-lg p-2 cursor-pointer">
              Shop
            </Link>
            <Link to={"/blog"} className="flex text-lg p-2 cursor-pointer">
              Blog
            </Link>
            <Link to={"/about"} className="flex text-lg p-2 cursor-pointer">
              About
            </Link>
            <Link to={"/contact"} className="flex text-lg p-2 cursor-pointer">
              Contacts
            </Link>
          </Col>
        </div>
        <div className="flex items-center">
          <Link
            className="flex text-base p-2 cursor-pointer"
            onClick={showDrawer}
          >
            <CiSearch size={30} fontWeight={800} />
          </Link>
          <Dropdown overlay={menu1} placement="bottomRight">
            {/* <Link className="flex text-base p-2 cursor-pointer">
              <CiUser size={24} />
            </Link> */}
            <Link href="/" className="flex text-base p-2 cursor-pointer">
              <Avatar
                src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                size={30}
                fontWeight={800}
              />
            </Link>
          </Dropdown>
          <Link href="#" className="flex text-base p-2 cursor-pointer">
            <Badge count={1} offset={[0, 0]} color="blue">
              <CiShoppingCart size={30} fontWeight={800} />
            </Badge>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
