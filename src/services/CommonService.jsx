const API_URL = process.env.REACT_APP_API_URL;

export const toImageURL = (url) => API_URL + "/" + url;

export const formatVND = (value) =>
  new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "&#8363;",
  }).format(value);
