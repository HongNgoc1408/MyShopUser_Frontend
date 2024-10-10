import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/product";

const getAllProduct = async () => await axios.get(API_URL);

const getByIdProduct = async (id, data) =>
  await axios.get(API_URL + `/${id}`, data);

// const fetchProductAttributes = async () => {
//   try {
//     const brands = await brandService.getBrands();
//     const categories = await categoryService.getAllCategory();
//     const data = {
//       brands: brands.data,
//       categories: categories.data,
//     };
//     return data;
//   } catch (error) {
//     return new Error(error);
//   }
// };

// const addProduct = async (data) => await axios.post(API_URL + "/create", data);

// const updateProduct = async (id, data) =>
//   await axios.put(API_URL + `/update/${id}`, data);

// const deleteProduct = async (id) =>
//   await axios.delete(API_URL + `/delete/${id}`);

// const getFilteredProducts = async (
//   page,
//   pageSize,
//   discount,
//   sorter,
//   categoryIds,
//   brandIds,
//   rating,
//   minPrice,
//   maxPrice,
//   flashSale
// ) =>
//   await axios.get(API_URL + "/filters", {
//     params: {
//       page: page,
//       pageSize: pageSize,
//       discount: discount ?? false,
//       sorter: sorter ?? 0,
//       categoryIds: categoryIds.length > 0 ? categoryIds : [],
//       brandIds: brandIds.length > 0 ? brandIds : [],
//       rating: rating ?? null,
//       minPrice: minPrice ?? null,
//       maxPrice: maxPrice ?? null,
//       flashSale: flashSale ?? false,
//     },
//     paramsSerializer: { indexes: true },
//   });

const ProductService = {
  getAllProduct,
  getByIdProduct,
  //   fetchProductAttributes,
  //   addProduct,

  //   updateProduct,
  //   deleteProduct,
  //   getFilteredProducts,
};
export default ProductService;
