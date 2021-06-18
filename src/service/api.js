import http from './http';

export const login = () => http.post('/app/appLogin?userPhone=13319109705&password=123456');

export const getGoodsDetail = params => http.get('/app/getGoodsDetail', params);
