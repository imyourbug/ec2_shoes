// import axios from 'axios';

// import { getCookie } from '@/helpers/helper.js';

// const baseDomain = "";
// const baseUrl = ``;

// console.log('init axios');

// export default axios.create({
//   baseUrl,
//   headers: {
//     Authorization: `Bearer ${getCookie("access_token")}`,
//   },
// });

import axios from 'axios';

import { getCookie } from '../../helpers/helper';

function getAxios() {
  return axios.create({
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
}

export { getAxios };
