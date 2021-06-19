/*
 * @Author : jaydon
 * @Date   : 2021-06-19 19:21
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';

// 遵循优先注册的原则，避免key冲突，后注册key以$$开头
export const addPrototypeToVue = (key, value, origin = '插件') => {
  if (Vue.prototype['$' + key]) {
    console.log(
      `%c 🥪 ${origin}: ${key} 已存在，在实例中使用 $$${key}`,
      'font-size:12px;background-color: #FCA650;color:#fff;'
    );

    addPrototypeToVue('$' + key, value);
  } else {
    Vue.prototype['$' + key] = value;
  }
};

export const parseContext = context => context.keys().reduce((prev, key) => Object.assign(prev, context(key)), {});
