/*
 * @Author : jaydon
 * @Date   : 2021-06-17 10:55
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import _ from 'lodash';
import ls from 'local-storage';
import moment from 'moment';
import './flexible';

export const addPrototypeToVue = (key, value) => (Vue.prototype['$' + key] = value);

addPrototypeToVue('ls', ls);
addPrototypeToVue('moment', moment);
addPrototypeToVue('event', new Vue());

// 全局注册lodash  $$开头
_.forEach(_, (fn, key) => addPrototypeToVue('$' + key, fn));

// 全局注册utils
const utils = require.context('./', false, /^(?!\.\/index).*\.js$/);
utils.keys().forEach(key => _.forEach(utils(key), (v, k) => addPrototypeToVue(k, v)));
