/*
 * @Author : jaydon
 * @Date   : 2021-07-14 23:41
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import ls from 'local-storage';
import { Router } from 'doui-vue';

const router = new Router({
  base: '',
  meta: {},
  components: require.context('@/views/', true, /index\.vue$/),
  lazyLoad: filePath => import(`@/views/${filePath}`)
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
