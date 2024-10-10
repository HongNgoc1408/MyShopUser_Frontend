import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/category";
const getAllCategory = async () => await axios.get(API_URL);

const CategoryService = {
  getAllCategory,
};
export default CategoryService;
