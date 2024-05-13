import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/detail_products`;

export default {
  getAll() {
    return getAxios().get(`${baseDomain}/api/clients/details/list`);
  },
  create(product_detail) {
    return getAxios().post(`${baseUrl}/create`, {
      product_id: product_detail.product_id,
      code_color: product_detail.color,
      code_size: product_detail.size,
      unit_in_stock: product_detail.quantity,
      thumb: product_detail.thumb,
    });
  },
  remove(detail_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: detail_id },
    });
  },
  removeAll(ids) {
    return getAxios().delete(`${baseUrl}/delete_all`, {
      data: { ids: ids },
    });
  },
  edit(product_detail) {
    return getAxios().put(`${baseUrl}/update`, {
      id: product_detail.id,
      product_id: product_detail.product_id,
      code_color: product_detail.color,
      code_size: product_detail.size,
      unit_in_stock: product_detail.quantity,
      thumb: product_detail.thumb,
    });
  },
};
