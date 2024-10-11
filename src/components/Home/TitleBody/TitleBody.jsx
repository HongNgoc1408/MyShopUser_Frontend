import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TitleBody = ({ title, link }) => {
  return (
    <div class="grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-3 title">{title}</div>
      <div class="col-end-7 col-span-2 title-add">
        <Link to={link} className="flex flex-nowrap items-center justify-end">
          <p className="pr-1">Xem thêm</p>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default TitleBody;
