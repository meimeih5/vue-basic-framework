import http from './http';

export const login = () => http.get({ cmd: 'GetProductsInfo', qrc: 'N320210616010003' });
export const getPolicy = () => http.get('/app/getPolicy');
