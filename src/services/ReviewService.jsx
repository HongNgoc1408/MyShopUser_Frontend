import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/reviews";

const getReview = async () =>
  await axios.get(API_URL, { headers: authHeader() });

const ReviewService = {
  getReview,
};
export default ReviewService;
