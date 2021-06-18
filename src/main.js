import Vue from 'vue';
import App from './App';
import { store, router } from './plugins';
import './service';
import './components';
import './utils';
import './styles/index.scss';

new Vue({
  store,
  router,
  ...App
}).$mount('#app');
