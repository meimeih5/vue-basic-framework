/*
 * @Author : jaydon
 * @Date   : 2021-06-17 21:41
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import _ from 'lodash';
import http from './http';
import { parseContext, addPrototypeToVue } from '@/utils';

const context = require.context('./apis', false, /\.js$/);
const apis = parseContext(context);

// 挂载api
_.forEach(apis, (value, key) => addPrototypeToVue(key, value));
addPrototypeToVue('http', http);

module.exports = apis;
