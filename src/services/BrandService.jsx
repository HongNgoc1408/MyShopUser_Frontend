import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/brand";
const getAllBrand = async () => await axios.get(API_URL);

const BrandService = {
    getAllBrand,
};
export default BrandService;
