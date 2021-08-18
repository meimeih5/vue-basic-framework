/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import Vue from 'vue';
import App from './App';
import { router } from './plugins';
import Element from 'element-ui';
import SimpleFlowChart from 'simple-flow-chart';
import clickOutside from 'v-click-outside';
import 'simple-flow-chart/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import './styles';

Vue.use(SimpleFlowChart);
Vue.use(Element);
Vue.use(clickOutside);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
