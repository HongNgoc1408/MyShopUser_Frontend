import React, { useEffect, useState } from "react";
import {
  formatDateTime,
  showError,
  toImageLink,
} from "../../services/commonService";
import ProductService from "../../services/ProductService";
import { Avatar, Button, Divider, Pagination, Rate, Result } from "antd";
import { SmileOutlined, UserOutlined } from "@ant-design/icons";

const Review = ({ id, rating }) => {
  const [data, setData] = useState([]);
  const [filterStar, setFilterStar] = useState(0);
  const [filterDescription, setFilterDescription] = useState(false);
  const [filterImages, setFilterImages] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getReview(id);
        // console.log(res.data);
        setData(res.data);
      } catch (error) {
        showError(error);
      }
    };
    fetchData();
  }, [id]);

  const filteredItems = data?.items?.filter((review) => {
    const starCondition = filterStar === 0 || review.star === filterStar;
    const descriptionCondition =
      !filterDescription ||
      (review.description && review.description.trim() !== "");
    const imagesCondition =
      !filterImages || (review.imagesUrls && review.imagesUrls.length > 0);

    return starCondition && descriptionCondition && imagesCondition;
  });

  return (
    <>
      <div className="bg-orange-50 p-5 my-5 flex">
        <div>
          <div className="text-5xl text-orange-600 font-semibold">
            {rating} <span className="text-2xl">trên 5.0</span>
          </div>
          <div>
            <Rate className="text-2xl" disabled defaultValue={rating} />
          </div>
        </div>

        <div className="mx-5">
          <div className="mb-2">
            <Button
              onClick={() => setFilterStar(0)}
              className={`mx-1 ${
                filterStar === 0 ? "bg-orange-500 text-white" : ""
              }`}
            >
              Tất cả
            </Button>
            <Button
              onClick={() => setFilterStar(5)}
              className={`mx-1 ${
                filterStar === 5 ? "bg-orange-500 text-white" : ""
              }`}
            >
              5 Sao
            </Button>
            <Button
              onClick={() => setFilterStar(4)}
              className={`mx-1 ${
                filterStar === 4 ? "bg-orange-500 text-white" : ""
              }`}
            >
              4 Sao
            </Button>
            <Button
              onClick={() => setFilterStar(3)}
              className={`mx-1 ${
                filterStar === 3 ? "bg-orange-500 text-white" : ""
              }`}
            >
              3 Sao
            </Button>
            <Button
              onClick={() => setFilterStar(2)}
              className={`mx-1 ${
                filterStar === 2 ? "bg-orange-500 text-white" : ""
              }`}
            >
              2 Sao
            </Button>
            <Button
              onClick={() => setFilterStar(1)}
              className={`mx-1 ${
                filterStar === 1 ? "bg-orange-500 text-white" : ""
              }`}
            >
              1 Sao
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setFilterDescription((prev) => !prev)}
              className={`mx-1 ${
                filterDescription ? "bg-orange-500 text-white" : ""
              }`}
            >
              Có Bình Luận
            </Button>
            <Button
              onClick={() => setFilterImages((prev) => !prev)}
              className={`mx-1 ${
                filterImages ? "bg-orange-500 text-white" : ""
              }`}
            >
              Có Hình Ảnh
            </Button>
          </div>
        </div>
      </div>

      {filteredItems && filteredItems.length > 0 ? (
        filteredItems.map((review, index) => (
          <React.Fragment key={index}>
            <div className="flex bg-gray-100">
              <div className="justify-center items-center">
                <Avatar
                  src={<img src="/User_review.jpg" alt="avatar" />}
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
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <div className="text-center text-gray-500 my-5 bg-white">
          <Result icon={<SmileOutlined />} title="Không có đánh giá nào!" />
        </div>
      )}
      <Pagination
        align="center"
        defaultCurrent={data.page}
        total={data.pageSize}
      />
    </>
  );
};

export default Review;
