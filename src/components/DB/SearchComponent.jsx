import React from "react";
import { Drawer, Input } from "antd";

const { Search } = Input;

const SearchComponent = ({ open, onClose }) => {
  const handleSearch = (value) => {
    console.log("Search query:", value);
    onClose();
  };

  return (
    <>
      <Drawer
        title="Tìm kiếm"
        placement="top"
        width={100}
        onClose={onClose}
        open={open}
        styles={{
          wrapper: { height: "fit-content" },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        <Search
          className="w-full"
          placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
        />
      </Drawer>
    </>
  );
};

export default SearchComponent;
