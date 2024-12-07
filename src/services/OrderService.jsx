import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/orders";

const getAll = async () => await axios.get(API_URL, { headers: authHeader() });

const getDetail = async (id) =>
  await axios.get(API_URL + `/${id}`, { headers: authHeader() });

const add = async (data) =>
  await axios.post(API_URL + "/create", data, { headers: authHeader() });

// const update = async (id, data) =>
//   await axios.put(API_URL + `/update/${id}`, data, {
//     headers: authHeader(),
//   });

const received = async (id, data) =>
  await axios.put(API_URL + `/received/${id}`, data, { headers: authHeader() });

const cancel = async (id) =>
  await axios.delete(API_URL + `/cancel/${id}`, { headers: authHeader() });

const review = async (id, data) =>
  await axios.post(API_URL + `/review/${id}`, data, { headers: authHeader() });

const getStatus = async (status, page, pageSize, key) =>
  await axios.get(API_URL + `/user/${status}`, {
    headers: authHeader(),
    params: {
      page: page,
      pageSize: pageSize,
      key: key ?? "",
    },
  });

const OrderService = {
  getAll,
  getDetail,
  add,
  // update,
  received,
  cancel,
  review,
  getStatus,
};

export default OrderService;
