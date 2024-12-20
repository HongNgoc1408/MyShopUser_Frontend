import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/sizes";

const getAll = async () => await axios.get(API_URL);

const getById = async (id) => await axios.get(API_URL + `/${id}`);

const create = async (data) =>
  await axios.post(API_URL + "/create", data, { headers: authHeader() });

const update = async (id, data) =>
  await axios.put(API_URL + `/update/${id}`, data, { headers: authHeader() });

const remove = async (id) =>
  await axios.delete(API_URL + `/delete/${id}`, { headers: authHeader() });

const SizeService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
export default SizeService;
