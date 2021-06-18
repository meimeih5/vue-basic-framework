/*
 * @Author : jaydon
 * @Date   : 2020-10-29 11:16
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import axios from 'axios';
import ls from 'local-storage';
import { Toast } from 'vant';

const baseURL = '/api/ezpic';

const defaultOptions = {
  loading: true
};

const http = async (method, url, params, options) => {
  const { loading } = Object.assign({}, defaultOptions, options);

  loading &&
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner'
    });

  const res = await axios({
    ...params,
    method,
    url,
    baseURL,
    headers: {
      token: ls('token')
    }
  });

  const { code, message, result } = res.data;

  if (code) {
    Toast.fail(message);
    return Promise.reject(message);
  }

  Toast.clear();
  return result;
};

const get = (url, params, options) => http('get', url, { params }, options);
const post = (url, data, options) => http('post', url, { data }, options);

export default {
  get,
  post
};
