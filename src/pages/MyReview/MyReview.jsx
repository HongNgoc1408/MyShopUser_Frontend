import React, { useEffect, useState } from "react";
import ReviewService from "../../services/ReviewService";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import { Avatar, Image, Rate } from "antd";
import { StarFilled, UserOutlined } from "@ant-design/icons";
import { formatDateTime, toImageLink } from "../../services/commonService";
import { Link } from "react-router-dom";

const breadcrumb = [
  {
    path: "/",
    title: "Trang chủ",
  },
  {
    title: "Đánh giá của tôi",
  },
];

const MyReview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await ReviewService.getReview();
        // console.log(res);
        setData(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="mb-8">
          <BreadcrumbLink breadcrumb={breadcrumb} />
        </div>
        {data.map((review) => (
          <>
            <div
              key={review.id}
              className="flex flex-col lg:flex-row bg-white shadow-lg p-6 rounded-lg mb-6"
            >
              <div className="flex flex-col lg:w-2/3 space-y-4">
                <div className="flex items-center space-x-4">
                  {/* <Image
                    style={{ width: "50px", height: "50px" }}
                    src={toImageLink(review.imageURL)}
                    alt="User Avatar"
                    className="rounded-full object-cover"
                  /> */}
                  <div>
                    {/* <h3 className="text-xl font-semibold">{review.username}</h3> */}
                    <p className="text-lg text-gray-500">
                      Thời gian đánh giá: {formatDateTime(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Rate
                    disabled
                    value={review.star}
                    className="text-xl text-yellow-400"
                  />
                  <span className="mx-1 text-xl">{review.star} Sao</span>
                </div>
                <div className="flex my-1 text-gray-600 text-lg">
                  <span className="font-semibold mr-1">Sản phẩm:</span>
                  <Link to={`/product-details/${review.productId}`}>
                    {review.productName}
                  </Link>
                  | <span className="font-semibold mx-1">Phân loại hàng:</span>
                  {review.colorName} | {review.sizeName}
                </div>
                <div className="my-1 text-lg">
                  <span className="font-semibold mr-1">Nội dung đánh giá:</span>
                  {review.description || "Không có nội dung đánh giá."}
                </div>
              </div>

              <div className="lg:w-1/3 lg:mt-0">
                {review.imagesUrls && review.imagesUrls.length > 0 ? (
                  <>
                    <h4 className="text-lg font-semibold mb-4">
                      Hình ảnh đánh giá
                    </h4>
                    <div className="flex gap-4">
                      {review.imagesUrls.map((imageUrl, idx) => (
                        <Image
                          style={{ width: "120px", height: "100%" }}
                          key={imageUrl}
                          src={toImageLink(imageUrl)}
                          alt={`Review Image ${idx}`}
                          className="object-cover"
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MyReview;
