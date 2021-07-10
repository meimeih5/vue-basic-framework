/*
 * @Author : jaydon
 * @Date   : 2020-10-29 11:16
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://g.huxiaodo.com
 */

import axios from 'axios';
import ls from 'local-storage';
import { $vuex } from '@/plugins';
import { Toast } from 'vant';

const baseURL = '/api/ezpic';

const defaultOptions = {
  loading: true
};

const setLoading = value => $vuex('vuex_loading', value);

const http = async (method, url, data, options) => {
  const { loading } = Object.assign({}, defaultOptions, options);

  loading &&
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner'
    });

  setLoading(true);

  try {
    const res = await axios({
      [method === 'get' ? 'params' : 'data']: data,
      method,
      url,
      baseURL,
      headers: {
        token: ls('token')
      }
    });

    const { code, message, result } = res.data;

    if (code) {
      throw new Error(message);
    }

    Toast.clear();
    return result;
  } catch ({ message }) {
    Toast.fail(message);
    return Promise.reject(message);
  } finally {
    setLoading(false);
  }
};

const get = (...rest) => http('get', ...rest);
const post = (...rest) => http('post', ...rest);
const put = (...rest) => http('put', ...rest);
const remove = (...rest) => http('remove', ...rest);

export default {
  get,
  post,
  put,
  remove
};
