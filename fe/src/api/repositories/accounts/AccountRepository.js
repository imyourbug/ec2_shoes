import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/accounts`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  register(account) {
    return getAxios().post(`${baseUrl}/create`, {
      name: account.name,
      email: account.email,
      password: account.password,
      role: 0, // user
    });
  },
  getAll() {
    return getAxios().get(`${baseUrl}/list`);
  },
  getDetail(user_id) {
    return getAxios().get(`${baseUrl}/detail/${user_id}`);
  },
  create(account) {
    return getAxios().post(`${baseUrl}/create`, {
      email: account.email,
      password: account.password,
      role: account.role,
    });
  },
  remove(user_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: user_id },
    });
  },
  edit(account) {
    return getAxios().put(`${baseUrl}/update`, {
      id: account.id,
      email: account.email,
      password: account.password,
      role: account.role,
    });
  },
};
