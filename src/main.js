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
  ...App
}).$mount('#app');
