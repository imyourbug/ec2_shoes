import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/statistics`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getRevenueByMonth(range) {
    return getAxios().get(`${baseUrl}/revenue?from=${range.from}&to=${range.to}`);
  },
};
