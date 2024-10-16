import axios from "axios";

const API_URL =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data";

const TOKEN_API = "23fbd696-8b95-11ef-8e53-0a00184fe694";

// const API_URL = "https://provinces.open-api.vn/api";

// const getProvince = async () => await axios.get(API_URL);

// const getProvince = async () => await axios.get(API_URL + "/p" , );

// const getDistrictsProvice = async (provinceCode) =>
//   await axios.get(`${API_URL}/p/${provinceCode}?depth=2`);

// const getWardsProvice = async (districtCode) =>
//   await axios.get(`${API_URL}/d/${districtCode}?depth=2`);

const getProvince = async () =>
  await axios.get(API_URL + "/province", { headers: { Token: TOKEN_API } });

const getDistrictsProvince = async (province_id) =>
  await axios.get(API_URL + `/district`, {
    headers: { Token: TOKEN_API },
    params: { province_id: province_id },
  });

const getWardsProvince = async (district_id) =>
  await axios.get(API_URL + `/ward`, {
    headers: { Token: TOKEN_API },
    params: { district_id: district_id },
  });

const AddressService = {
  getProvince,
  getDistrictsProvince,
  getWardsProvince,
};

export default AddressService;
