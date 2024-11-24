import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/user";

const getAddress = async () =>
  await axios.get(API_URL + "/address", { headers: authHeader() });

const updateAddress = async (data) =>
  await axios.put(API_URL + "/address", data, { headers: authHeader() });

const getProfile = async () =>
  await axios.get(API_URL + "/profile", { headers: authHeader() });

const updateProfile = async (data) => {
  await axios.put(API_URL + "/profile", data, { headers: authHeader() });
};

const getAvatar = async () =>
  await axios.get(API_URL + "/avatar", { headers: authHeader() });

const updateAvatar = async (data) =>
  await axios.put(API_URL + "/avatar", data, { headers: authHeader() });

const getFavorite = async () =>
  await axios.get(API_URL + "/favorite", { headers: authHeader() });

const getFavoriteProduct = async (page, pageSize, keySearch) =>
  await axios.get(API_URL + "/favorite/products", {
    headers: authHeader(),
    params: {
      page: page,
      pageSize: pageSize,
      key: keySearch ?? "",
    },
  });

const addFavorite = async (productId) =>
  await axios.post(
    API_URL + "/favorite",
    { id: productId },
    {
      headers: authHeader(),
    }
  );

const deleteFavoriteProduct = async (productId) =>
  await axios.delete(API_URL + `/favorite/${productId}`, {
    headers: authHeader(),
  });

const UserService = {
  getAddress,
  updateAddress,
  getProfile,
  updateProfile,
  getAvatar,
  updateAvatar,
  getFavorite,
  getFavoriteProduct,
  addFavorite,
  deleteFavoriteProduct,
};

export default UserService;
