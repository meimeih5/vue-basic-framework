/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import App from './App';
import { store, router, i18n } from './plugins';
import './components';
import './service';
import './utils';
import './styles';

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
