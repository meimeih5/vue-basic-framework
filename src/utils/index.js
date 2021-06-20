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
import dayjs from 'dayjs';
import jsCookie from 'js-cookie';
import { addPrototypeToVue, parseContext } from './common';

const context = require.context('./', false, /^(?!\.\/index).*\.js$/);
const utils = parseContext(context);

addPrototypeToVue('ls', ls);
addPrototypeToVue('dayjs', dayjs);
addPrototypeToVue('cookie', jsCookie);
addPrototypeToVue('event', new Vue());

// 挂载lodash
_.forEach(_, (value, key) => addPrototypeToVue(key, value, 'lodash'));

// 挂载utils
_.forEach(utils, (value, key) => addPrototypeToVue(key, value));

module.exports = utils;
