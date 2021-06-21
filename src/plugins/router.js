/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueNavigation from 'vue-navigation';
import ls from 'local-storage';
import _ from 'lodash';

const whiteList = ['/login'];
const defaultTitle = document.title;

const components = require.context('@/views/', true, /index\.vue$/);

const routes = components.keys().map(key => {
  const { name, meta: { path: alias, ...rest } = {} } = components(key).default;
  const fileName = key.replace(/\.\//g, '');
  const path = _.kebabCase(fileName.replace(/index\.vue/gi, ''));

  return {
    name,
    alias,
    meta: rest,
    path: '/' + path,
    component: () => import(`@/views/${fileName}`)
  };
});

const router = new VueRouter({
  base: '',
  routes: routes.concat({ path: '*', redirect: '/' })
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || defaultTitle;

  if (whiteList.includes(to.path) || ls('token')) {
    return next();
  }

  next({
    path: '/login',
    replace: true
  });
});

Vue.use(VueRouter);
Vue.use(VueNavigation, { router });

export { router };
