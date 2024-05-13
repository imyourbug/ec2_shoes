import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/orders`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAllOrders() {
    return getAxios().get(`${baseUrl}/list`);
  },
  getOrderById(order_id) {
    return getAxios().get(`${baseUrl}/details/${order_id}`);
  },
  remove(order_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: order_id },
    });
  },
  edit(order_id, status) {
    return getAxios().put(`${baseUrl}/update`, {
      id: order_id,
      status: status,
    });
  },
  searchOrder(order) {
    return getAxios().post(`${baseUrl}/search`, {
      id: order.id,
      email: order.email,
    });
  },
};
