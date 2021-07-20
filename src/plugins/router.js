/*
 * @Author : jaydon
 * @Date   : 2021-07-14 23:41
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import Vue from 'vue';
import ls from 'local-storage';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/home'),
      redirect: '/user',
      children: [
        {
          path: 'user',
          component: () => import('@/views/user')
        },
        {
          path: 'user-details',
          component: () => import('@/views/user/details')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
});

// 不需要登录的页面
const whiteList = ['/login'];
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

export { router };
