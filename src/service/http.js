/*
 * @Author : jaydon
 * @Date   : 2020-10-29 11:16
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import axios from 'axios';
import ls from 'local-storage';
import { vuex } from 'doui-vue';
import { message } from 'ant-design-vue';

const baseURL = '/api/ezpic';

const defaultOptions = {
  loading: true
};

const setLoading = value => vuex.update('vuex_loading', value);

const http = async (method, url, data, options) => {
  const { loading } = Object.assign({}, defaultOptions, options);
  const closeLoading = loading && message.loading('请求中...', 0);

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

    return result;
  } catch (err) {
    message.error(err.message, 2);
    return Promise.reject(err.message);
  } finally {
    closeLoading && closeLoading();
    setLoading(false);
  }
};

export default {
  get: (...rest) => http('get', ...rest),
  post: (...rest) => http('post', ...rest),
  put: (...rest) => http('put', ...rest),
  remove: (...rest) => http('delete', ...rest)
};
