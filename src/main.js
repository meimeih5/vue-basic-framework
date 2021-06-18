import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './plugins';
import './service';
import './components';
import './utils';
import './style/index.scss';

new Vue({
  store,
  router,
  ...App
}).$mount('#app');
