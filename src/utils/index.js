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
import jsCookie from 'js-cookie';

addPrototypeToVue('ls', ls);
addPrototypeToVue('moment', moment);
addPrototypeToVue('cookie', jsCookie);
addPrototypeToVue('event', new Vue());

// 全局注册lodash
_.forEach(_, (fn, key) => addPrototypeToVue(key, fn, 'lodash'));

// 全局注册utils
const utils = require.context('./', false, /^(?!\.\/index).*\.js$/);
utils.keys().forEach(key => _.forEach(utils(key), (v, k) => addPrototypeToVue(k, v)));

// 遵循优先注册的原则，避免key冲突，后注册key以$$开头
export function addPrototypeToVue(key, value, origin = '插件') {
  if (Vue.prototype['$' + key]) {
    console.log(
      `%c 🥪 ${origin}: ${key} 已存在，在实例中使用 $$${key}`,
      'font-size:12px;background-color: #FCA650;color:#fff;'
    );

    addPrototypeToVue('$' + key, value);
  } else {
    Vue.prototype['$' + key] = value;
  }
}
