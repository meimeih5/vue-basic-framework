/*
 * @Author : jaydon
 * @Date   : 2020-10-29 11:16
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import axios from 'axios';
import ls from 'local-storage';
import { $vuex } from '@/store';
import { Toast } from 'vant';

const baseURL = '/api/ezpic';

const defaultOptions = {
  loading: true
};

const setLoading = value => $vuex('vuex_loading', value);

const http = async (method, url, params, options) => {
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

const get = (url, params, options) => http('get', url, { params }, options);
const post = (url, data, options) => http('post', url, { data }, options);

export default {
  get,
  post
};
