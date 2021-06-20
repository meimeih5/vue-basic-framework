/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import ls from 'local-storage';
import _ from 'lodash';

Vue.use(VueRouter);

const whiteList = ['/login'];
const defaultTitle = document.title;

const components = require.context('@/views/', true, /index\.vue$/);

const routes = components.keys().map(key => {
  const { name, routePath, meta } = components(key).default;
  const fileName = key.replace(/\.\//g, '');
  const path = _.kebabCase(fileName.replace(/index\.vue/gi, ''));

  return {
    name,
    meta,
    alias: routePath,
    path: '/' + path,
    component: () => import(`@/views/${fileName}`)
  };
});

const router = new VueRouter({
  base: '',
  routes
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

export { router };
