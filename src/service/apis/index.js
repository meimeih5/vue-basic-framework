/*
 * @Author : jaydon
 * @Date   : 2021-06-19 18:46
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import http from '../http';

export const login = () => http.post('/app/appLogin?userPhone=13319109705&password=123456');

export const getGoodsDetail = params => http.get('/getGoodsDetail', params);
