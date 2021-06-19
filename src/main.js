import Vue from 'vue';
import App from './App';
import { store, router, i18n } from './plugins';
import './service';
import './components';
import './utils';
import './styles/index.scss';

new Vue({
  store,
  router,
  i18n,
  ...App
}).$mount('#app');
