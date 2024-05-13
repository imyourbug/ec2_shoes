import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/vouchers`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAllVouchers() {
    return getAxios().get(`${baseUrl}/list`);
  },
  create(voucher) {
    return getAxios().post(`${baseUrl}/create`, {
      name: voucher.name,
      discount: voucher.discount,
      active: voucher.active,
    });
  },
  remove(voucher_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: voucher_id },
    });
  },
  edit(voucher) {
    return getAxios().put(`${baseUrl}/update`, {
      id: voucher.id,
      name: voucher.name,
      discount: voucher.discount,
      active: voucher.active,
    });
  },
};
