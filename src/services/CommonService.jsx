import { notification } from "antd";

const API_URL = process.env.REACT_APP_API_URL;

export const toImageLink = (link) => {
  return API_URL + "/" + link;
};

export const showError = (error) => {
  const errorMessage =
    error?.response?.data?.title || error?.response?.data || error?.message;

  notification.error({
    message: "Error",
    placement: "top",
    description: errorMessage,
  });
};

export const toImageSrc = (url) => API_URL + "/" + url;

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const dataValueLabel = (data) => {
  return data.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }));
};

export const formatVND = (value) => {
  const format = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });
  return format.format(value);
};

export const formatDis = (value) => {
  const format = new Intl.NumberFormat("vi", {
    style: "percent",
  });
  return format.format(value / 100);
};

export const formatDateTime = (date) => new Date(date).toLocaleString("vi-VN");

export const toTextLabel = (data) => {
  return data.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }));
};

export const toTextValue = (data) => {
  return data.map((value) => ({
    value: value,
    text: value,
  }));
};

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === "{}";
};

export const paymentMethod = [
  { value: "COD", label: "Thanh toán khi nhận hàng" },
  { value: "VNPay", label: "Thanh toán ví VNPay" },
];

export const statusOrders = [
  { value: 0, label: "Đang xử lý" },
  { value: 1, label: "Đã duyệt" },
  { value: 2, label: "Đang vận chuyển" },
  { value: 3, label: "Đã nhận" },
  { value: 4, label: "Đã hủy" }, 
];

export const statusOrder = [
  { value: "Processing", label: "Đang xử lý" },
  { value: "Confirmed", label: "Đã duyệt" }, 
  { value: "Shipping", label: "Đang vận chuyển" },
  { value: "Received", label: "Đã nhận" },
  { value: "Canceled", label: "Đã hủy" },
];

export const getPaymentDeadline = (date) =>
  new Date(date).getTime() + 1000 * 60 * 15;
