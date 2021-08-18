/*
 * @Author : jaydon
 * @Date   : 2021-07-14 23:41
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/index')
    }
  ]
});

export { router };
