import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/colors`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAllColors() {
    return getAxios().get(`${baseUrl}/list`);
  },
};
