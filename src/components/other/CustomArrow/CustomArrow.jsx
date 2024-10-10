import React from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./CustomArrows.css";

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={`${className} custom-prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <LeftOutlined />
    </Button>
  );
};

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={`${className} custom-next-arrow`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <RightOutlined />
    </Button>
  );
};
