/*
 * @Author : jaydon
 * @Date   : 2021-06-17 21:41
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import _ from 'lodash';
import http from './http';
import * as apis from './api';
import { addPrototypeToVue } from '@/utils';

export * from './api';

// 挂载api
_.forEach(apis, (api, key) => addPrototypeToVue(key, api));
addPrototypeToVue('http', http);
