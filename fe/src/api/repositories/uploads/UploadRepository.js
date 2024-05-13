import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/uploads`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  uploadImage(formData) {
    return getAxios().post(`${baseUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
