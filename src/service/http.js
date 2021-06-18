/*
 * @Author : jaydon
 * @Date   : 2020-10-29 11:16
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import axios from 'axios';
import { Toast } from 'vant';

const baseURL = '/api/ezpic';

const http = async (method, url, params) => {
  const { data } = await axios({
    ...params,
    method,
    url,
    baseURL,
    headers: {
      token: sessionStorage.getItem('token')
    }
  });

  console.log(data, '---data---');

  if (data.success) {
    return data.data;
  }

  Toast.fail(data.msgtext);
  return Promise.reject(data);
};

const get = (params, url) => http('get', url, { params });
const post = (data, url) => http('post', url, { data });

export default {
  get,
  post
};
