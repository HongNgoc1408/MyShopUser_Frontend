import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/api/payments";

const getAll = async () => await axios.get(API_URL, { headers: authHeader() });

const get = async () =>
  await axios.get(API_URL + "/vnpay-callback", { headers: authHeader() });
const PaymentsService = {
  getAll,
  get,
};

export default PaymentsService;
