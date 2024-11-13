import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/cart";

const count = async () =>
  await axios.get(API_URL + "/count", { headers: authHeader() });

const getAllByUserId = async () =>
  await axios.get(API_URL, { headers: authHeader() });

const add = async (data) =>
  await axios.post(API_URL + "/create", data, { headers: authHeader() });

const update = async (id, data) =>
  await axios.put(API_URL + `/update/${id}`, data, {
    headers: authHeader(),
  });

const removeAll = async (productIds) => {
  const params = new URLSearchParams();
  productIds.forEach((id) => params.append("productId", id));

  return await axios.delete(API_URL + "/delete", {
    params,
    headers: authHeader(),
  });
};

const remove = async (cartId) => {
  return await axios.delete(API_URL + `/${cartId}`, {
    headers: authHeader(),
  });
};

const CartService = {
  count,
  getAllByUserId,
  add,
  update,
  remove,
  removeAll,
};

export default CartService;
