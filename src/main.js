import Vue from 'vue';
import App from './App';
import router from './router';
import './plugins';
import './service';
import './components';
import './utils';
import './style/index.scss';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
