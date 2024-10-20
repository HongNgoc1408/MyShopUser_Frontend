import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/orders";

const getAll = async () => await axios.get(API_URL, { headers: authHeader() });

const getDetail = async (id) =>
  await axios.get(API_URL + `/${id}`, { headers: authHeader() });

const add = async (data) =>
  await axios.post(API_URL + "/create", data, { headers: authHeader() });

const update = async (id, data) =>
  await axios.put(API_URL + `/update/${id}`, data, {
    headers: authHeader(),
  });

const cancel = async (id) =>
  await axios.delete(API_URL + `/cancel/${id}`, { headers: authHeader() });

const OrderService = {
  getAll,
  getDetail,
  add,
  update,
  cancel,
};

export default OrderService;
