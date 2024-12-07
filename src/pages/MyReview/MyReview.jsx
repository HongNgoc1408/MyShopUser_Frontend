import React, { useEffect, useState } from "react";
import ReviewService from "../../services/ReviewService";
import BreadcrumbLink from "../../components/BreadcrumbLink";
import { Avatar, Image, Rate } from "antd";
import { StarFilled, UserOutlined } from "@ant-design/icons";
import { formatDateTime, toImageLink } from "../../services/commonService";

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
          <div className="flex bg-gray-100">
            <div className="justify-center items-center">
              <Avatar
                src={
                  <img
                    src={toImageLink(review.imageURL) || "/avatar.png"}
                    alt="avatar"
                  />
                }
                size={64}
                icon={<UserOutlined />}
              />
            </div>
            <div className="pl-4">
              <div className="text-base font-semibold">{review.username}</div>
              <div className="flex items-center">
                <Rate disabled value={review.star} className="text-base" />
                <span className="mx-1">{review.star} Sao</span>
              </div>
              <div className="flex my-1 text-gray-600 text-base">
                {formatDateTime(review.createdAt)} | Phân loại hàng:{" "}
                {review.colorName} | {review.sizeName}
              </div>
              <div className="my-1 text-lg">
                {review.description || "Không có nội dung đánh giá."}
              </div>
              <div className="flex space-x-2 my-1">
                {review.imagesUrls && review.imagesUrls.length > 0 ? (
                  review.imagesUrls.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={toImageLink(image)}
                      alt={`review-img-${imgIndex}`}
                      className="w-16 h-20 object-cover"
                    />
                  ))
                ) : (
                  <span className="text-gray-400">Không có hình ảnh</span>
                )}
              </div>
            </div>
          </div>
          // <div
          //   key={review.id}
          //   className="flex flex-col lg:flex-row bg-white shadow-lg p-6 rounded-lg mb-6"
          // >

          //   <div className="flex flex-col lg:w-2/3 space-y-4">
          //     <div className="flex items-center space-x-4">
          //       <Image
          //         style={{ width: "50px", height: "50px" }}
          //         src={toImageLink(review.imageURL)}
          //         alt="User Avatar"
          //         className="rounded-full object-cover"
          //       />
          //       <div>
          //         <h3 className="text-xl font-semibold">{review.username}</h3>
          //         <p className="text-sm text-gray-500">
          //           {new Date(review.createdAt).toLocaleDateString("vi-VN")}
          //         </p>
          //       </div>
          //     </div>

          //     <div className="flex items-center">
          //       <Rate
          //         disabled
          //         value={review.star}
          //         character={<StarFilled />}
          //         className="text-yellow-400"
          //       />
          //     </div>

          //     <p className="text-sm text-gray-700 mt-2">{review.description}</p>

          //     <div className="flex space-x-3">
          //       <span className="font-semibold">Màu sắc:</span>
          //       <span>{review.colorName}</span>
          //     </div>

          //     <div className="flex space-x-3">
          //       <span className="font-semibold">Kích thước:</span>
          //       <span>{review.sizeName}</span>
          //     </div>

          //     <div className="flex space-x-3">
          //       <span className="font-semibold">Sản phẩm:</span>
          //       <span>{review.productName}</span>
          //     </div>
          //   </div>

          //   <div className="lg:w-1/3 mt-3 lg:mt-0">
          //     {
          //       review.imagesUrls && review.imagesUrls.length > 0 ? (
          //         <>
          //           <div className="py-4 border-t-2">
          //             <h4 className="text-lg font-semibold mb-4">
          //               Hình ảnh đánh giá
          //             </h4>
          //             <div className="flex gap-4">
          //               {review.imagesUrls.map((imageUrl, idx) => (
          //                 <Image
          //                   style={{ width: "120px", height: "100%" }}
          //                   key={idx}
          //                   src={toImageLink(imageUrl)}
          //                   alt={`Review Image ${idx}`}
          //                   className="object-cover"
          //                 />
          //               ))}
          //             </div>
          //           </div>
          //         </>
          //       ) : null
          //       //   <p className="text-gray-500">Không có hình ảnh</p>
          //     }
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default MyReview;
