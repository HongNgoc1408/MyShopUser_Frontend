import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/user";

const getAddress = async () =>
  await axios.get(API_URL + "/address", { headers: authHeader() });

const updateAddress = async (data) =>
  await axios.put(API_URL + "/address", data, { headers: authHeader() });

const UserService = {
  getAddress,
  updateAddress,
};

export default UserService;
