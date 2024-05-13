import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/suppliers`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAll() {
    return getAxios().get(`${baseUrl}/list`);
  },
  getDetail(supplier_id) {
    return getAxios().get(`${baseUrl}/detail/${supplier_id}`);
  },
  create(supplier) {
    return getAxios().post(`${baseUrl}/create`, {
      name: supplier.name,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
    });
  },
  remove(supplier_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: supplier_id },
    });
  },
  edit(supplier) {
    return getAxios().put(`${baseUrl}/update`, {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
    });
  },
};
