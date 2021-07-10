/*
 * @Author : jaydon
 * @Date   : 2021-06-17 10:55
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import _ from 'lodash';
import { addPrototypeToVue, parseContext } from './common';

const context = require.context('./', false, /^(?!\.\/index).*\.js$/);
const utils = parseContext(context);

// 挂载utils
_.forEach(utils, (value, key) => addPrototypeToVue(key, value));

module.exports = utils;
