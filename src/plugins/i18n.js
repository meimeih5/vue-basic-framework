/*
 * @Author : jaydon
 * @Date   : 2021-06-19 22:04
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { state } from './store';

Vue.use(VueI18n);

const context = require.context('@locales', false, /\.json$/);

const messages = context.keys().reduce((prev, key) => {
  const language = key.replace(/\.\/|\.json/g, '');
  prev[language] = context(key);
  return prev;
}, {});

const i18n = new VueI18n({
  locale: state.vuex_common.language,
  messages
});

export { i18n };
