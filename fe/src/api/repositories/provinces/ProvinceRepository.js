import axios from 'axios';

const baseDomain = "https://provinces.open-api.vn";
const baseUrl = `${baseDomain}/api`;
const axs = axios.create({
  baseUrl,
});

export default {
  getAllProvinces() {
    return axs.get(`${baseUrl}/p/`);
  },
  getDistrictsByCodeProvince(code_province) {
    return axs.get(`${baseUrl}/p/${code_province}?depth=2`);
  },
  getWardsByCodeDistrict(code_district) {
    return axs.get(`${baseUrl}/d/${code_district}?depth=2`);
  },
};
