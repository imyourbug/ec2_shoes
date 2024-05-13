import axios from 'axios';

import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/authentications`;

export default {
  login(account) {
    return getAxios().post(`${baseUrl}/login`, {
      email: account.email,
      password: account.password,
    });
  },
  socialLogin(account) {
    return getAxios().post(`${baseUrl}/socials/login`, {
      email: account.email,
      provider_user_id: account.id,
      avatar: account.avatar,
      name: account.name,
      type: account.type,
    });
  },
  changePassword(account) {
    return getAxios().post(`${baseUrl}/change_password`, {
      email: account.email,
      password: account.password,
      new_password: account.new_password,
      re_new_password: account.re_new_password,
    });
  },
  resetPassword(email) {
    return getAxios().post(`${baseUrl}/reset_password`, {
      email: email,
    });
  },
  getInforByAccessTokenFB(access_token) {
    return axios.get(
      `https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,picture&access_token=${access_token}`
    );
  },
};
