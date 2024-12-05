import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/image";

// const search = async (imagePixels) =>
//   await axios.post(API_URL + "/search", imagePixels, { headers: authHeader() });

const search = async (imagePixels) => {
  try {
    console.log("imagePixels type:", Array.isArray(imagePixels)); // Kiểm tra nếu là mảng
    console.log("imagePixels length:", imagePixels.length); // Kiểm tra độ dài của mảng

    // Kiểm tra đầu vào
    const response = await axios.post(
      API_URL + "/search",
      imagePixels, // Gửi trực tiếp mảng imagePixels
      { headers: authHeader() }
    );
    console.log("Predicted Label:", response.data);
  } catch (error) {
    console.error("Error predicting label:", error);
  }
};

const ImageService = {
  search,
};
export default ImageService;
