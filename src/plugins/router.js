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

// 不需要登录的页面
const whiteList = ['/login'];

const defaultMeta = {
  transition: true
};

// 导入页面
const components = require.context('@/views/', true, /index\.vue$/);
const routes = components.keys().map(key => {
  const { name, meta } = components(key).default;
  const { path, ...rest } = _.merge({}, defaultMeta, meta);
  const fileName = key.replace(/\.\//g, '');

  return {
    name,
    alias: path,
    meta: rest,
    path: '/' + _.kebabCase(fileName.replace(/index\.vue/gi, '')),
    component: () => import(`@/views/${fileName}`)
  };
});

const router = new VueRouter({
  base: '',
  routes: routes.concat({ path: '*', redirect: '/' })
});

// 路由守卫
const defaultTitle = document.title;
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

// 解决重复跳转路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export { router };
