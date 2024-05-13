import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/clients`;

export default {
  getAllProductGroup() {
    return getAxios().get(`${baseUrl}/list_product_group`);
  },
  getDetailProduct(id) {
    return getAxios().get(`${baseUrl}/product/${id}`);
  },
  getAllDetailProduct() {
    return getAxios().get(`${baseUrl}/details/list`);
  },
  searchProductByKeyWord(key_word) {
    return getAxios().get(`${baseUrl}/search/${key_word}`);
  },
  createOrder(data) {
    return getAxios().post(`${baseUrl}/orders/create`, {
      carts: data.carts,
      customer: data.customer,
      status: 0, // default - in progress
      discount: data.discount,
      total_money: data.total_money,
      payment_method: data.payment_method,
      payment_status: data.payment_status,
      shipment_id: data.shipment_id,
    });
  },
  updateInfo(user) {
    return getAxios().put(`${baseUrl}/info/update`, {
      user: user,
    });
  },
  checkOutVnpay(total_money) {
    return getAxios().post(`${baseUrl}/checkouts/vnpay`, {
      total: total_money
    });
  }
};
