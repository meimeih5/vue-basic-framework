/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import Vue from 'vue';
import App from './App';
import Doui, { vuex } from 'doui-vue';
import { router, createI18n } from './plugins';
import { vuexConfig } from './common';
import './components';
import './service';
import './utils';
import './styles';

Vue.use(Doui, { vuex: vuexConfig });

new Vue({
  router,
  store: vuex.store,
  i18n: createI18n(vuex.state),
  render: h => h(App)
}).$mount('#app');
