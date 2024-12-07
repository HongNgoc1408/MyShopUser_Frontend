import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  InputNumber,
  Pagination,
  Rate,
  Result,
  Select,
} from "antd";
import CardProduct from "../../Home/CardProduct";
import ProductService from "../../../services/ProductService";
import { SmileOutlined } from "@ant-design/icons";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import { CiFilter } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const AllProduct = ({ keySearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [pageSize, setPageSize] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedSorter, setSelectedSorter] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);
  const [discount, setDiscount] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategorys, setShowAllCategorys] = useState(false);

  const handleShowAllBrands = () => {
    setShowAllBrands(true);
  };
  const handleShowAllCategorys = () => {
    setShowAllCategorys(true);
  };

  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // console.log(keySearch);

        if (keySearch) {
          const search = await ProductService.getSearchProducts({
            Key: keySearch,
          });

          const res = await ProductService.getFilterProducts({
            page,
            pageSize,
            Key: "",
            brandIds: selectedBrandIds,
            categoryIds: selectedCategoryIds,
            sorter: selectedSorter,
            rating: selectedRating,
            discount,
            minPrice,
            maxPrice,
          });

          const product = res.data.items.filter((product) =>
            search.data.some((searchProduct) => searchProduct.id === product.id)
          );

          setProducts(product);
          setTotalItems(product.length);
        } else {
          const res = await ProductService.getFilterProducts({
            page,
            pageSize,
            Key: keySearch,
            brandIds: selectedBrandIds,
            categoryIds: selectedCategoryIds,
            sorter: selectedSorter,
            rating: selectedRating,
            discount,
            minPrice,
            maxPrice,
          });
          setProducts(res.data.items);

          setTotalItems(res.data.totalItems);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [
    page,
    pageSize,
    keySearch,
    selectedBrandIds,
    selectedCategoryIds,
    selectedRating,
    selectedSorter,
    discount,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await BrandService.getAll();
        setBrands(res.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const res = await CategoryService.getAll();
        setCategorys(res.data);
      } catch (error) {
        console.error("Error fetching categorys:", error);
      }
    };

    fetchCategorys();
  }, []);

  const handleBrandChange = (brandId) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const handleSorterChange = (value) => {
    setSelectedSorter(value);
  };

  const handleDiscountChange = () => {
    if (discount) {
      setDiscount(false);
    } else setDiscount(true);
  };

  return (
    <div className="container mx-auto max-lg:px-8 px-20">
      <div className="my-5">
        <div className="grid grid-cols-6 gap-6 py-5">
          <div className="col-span-1">
            <div className="truncate">
              <div className="flex flex-nowrap text-lg uppercase font-extrabold pb-5">
                <div className=" mr-1 m-auto">
                  <CiFilter />
                </div>
                <div className="m-auto">
                  <p>Bộ lọc tìm kiếm</p>
                </div>
              </div>

              <div>
                <div>
                  <div className="text-lg capitalize pb-2 font-bold">
                    Thương hiệu
                  </div>
                  <div className="flex flex-col border-b-2 pb-5">
                    {brands
                      .slice(0, showAllBrands ? brands.length : 5)
                      .map((brand) => (
                        <Checkbox
                          key={brand.id}
                          checked={selectedBrandIds.includes(brand.id)}
                          onChange={() => handleBrandChange(brand.id)}
                          className="text-lg"
                        >
                          {brand.name}
                        </Checkbox>
                      ))}
                    {brands.length > 5 && !showAllBrands && (
                      <div className="text-left">
                        <Button type="text" onClick={handleShowAllBrands}>
                          Thêm
                          <FaAngleDown />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-lg capitalize py-2 font-bold">
                    Danh mục
                  </div>
                  <div className="flex flex-col border-b-2 pb-5">
                    {categorys
                      .slice(0, showAllCategorys ? categorys.length : 5)
                      .map((category) => (
                        <Checkbox
                          key={category.id}
                          checked={selectedCategoryIds.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                          className="text-lg"
                        >
                          {category.name}
                        </Checkbox>
                      ))}
                    {categorys.length > 5 && !showAllCategorys && (
                      <div className="text-left text-black">
                        <Button type="text" onClick={handleShowAllCategorys}>
                          Thêm
                          <FaAngleDown />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-lg capitalize py-2 font-bold">
                    Khoảng giá
                  </div>
                  <div className="flex border-b-2 pb-5">
                    <InputNumber
                      min={0}
                      value={minPrice}
                      placeholder="TỪ"
                      formatter={(value) =>
                        value
                          ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          : ""
                      }
                      parser={(value) =>
                        value.replace(/₫\s?|(\.*)/g, "").replace(/\./g, "")
                      }
                      style={{ width: "100px" }}
                      onChange={(value) => setMinPrice(value)}
                    />
                    <span className="mx-1"> _ </span>
                    <InputNumber
                      min={0}
                      value={maxPrice}
                      formatter={(value) =>
                        value
                          ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          : ""
                      }
                      parser={(value) =>
                        value.replace(/₫\s?|(\.*)/g, "").replace(/\./g, "")
                      }
                      placeholder="ĐẾN"
                      style={{ width: "100px" }}
                      onChange={(value) => setMaxPrice(value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-lg capitalize py-2 font-bold">
                    Đánh giá
                  </div>
                  <div className="flex flex-col border-b-2 pb-5">
                    <Checkbox
                      key={5}
                      checked={selectedRating === 5}
                      onChange={() => handleRatingChange(5)}
                      className="text-lg"
                    >
                      <Rate value={5} disabled />
                    </Checkbox>
                    <Checkbox
                      key={4}
                      checked={selectedRating === 4}
                      onChange={() => handleRatingChange(4)}
                      className="text-lg"
                    >
                      <Rate value={4} disabled />
                    </Checkbox>{" "}
                    <Checkbox
                      key={3}
                      checked={selectedRating === 3}
                      onChange={() => handleRatingChange(3)}
                      className="text-lg"
                    >
                      <Rate value={3} disabled />
                    </Checkbox>{" "}
                    <Checkbox
                      key={2}
                      checked={selectedRating === 2}
                      onChange={() => handleRatingChange(2)}
                      className="text-lg"
                    >
                      <Rate value={2} disabled />
                    </Checkbox>{" "}
                    <Checkbox
                      key={1}
                      checked={selectedRating === 1}
                      onChange={() => handleRatingChange(1)}
                      className="text-lg"
                    >
                      <Rate value={1} disabled />
                    </Checkbox>
                  </div>
                </div>
                <div className="py-5 mx-auto justify-center items-center">
                  <button
                    className="default-button w-full uppercase"
                    onClick={() => {
                      setSelectedBrandIds([]);
                      setSelectedCategoryIds([]);
                      setSelectedRating([]);
                      setMinPrice(null);
                      setMaxPrice(null);
                      setDiscount(false);
                      setSelectedSorter(0);
                    }}
                  >
                    <p className="relative z-10">Xóa tất cả</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-2 gap-2 text-base font-extrabold border-b-2 pb-2 md:grid-cols-2 sm:grid-cols-3">
              <div className="flex col-start-1 col-end-3">
                <div className="mr-2">
                  <p>Sắp xếp theo </p>
                </div>
                <div className="mr-2">
                  <Button onClick={handleDiscountChange} className="border-2">
                    {discount ? "Giảm giá: Có" : "Giảm giá: Không"}
                  </Button>
                </div>
                <div className="mr-2">
                  <Select
                    value={selectedSorter}
                    style={{ width: 150 }}
                    allowClear
                    onChange={handleSorterChange}
                  >
                    <Select.Option value={0}>Bán chạy</Select.Option>
                    <Select.Option value={1}>Thấp đến Cao</Select.Option>
                    <Select.Option value={2}>Cao đến Thấp</Select.Option>
                    <Select.Option value={3}>Mới nhất</Select.Option>
                  </Select>
                </div>
              </div>

              <div className="col-end-6 col-span-2">
                <Pagination
                  simple={{
                    readOnly: true,
                  }}
                  current={page}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={handlePageChange}
                />
              </div>
            </div>

            <>
              {products.length > 0 ? (
                <>
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 py-5">
                    {products.map((product) => (
                      <CardProduct key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <Result
                    icon={<SmileOutlined />}
                    title="Không tìm thấy sản phẩm bạn cần tìm!"
                  />
                </div>
              )}
            </>

            <div>
              {/* <Pagination
                align="center"
                showSizeChanger
                current={page}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
              /> */}
              <Pagination
                align="center"
                hideOnSinglePage
                showSizeChanger
                defaultCurrent={page}
                defaultPageSize={pageSize}
                total={totalItems}
                onChange={(newPage, newPageSize) => {
                  setPage(newPage);
                  setPageSize(newPageSize);
                  setSearchParams(`page=${newPage}`);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
