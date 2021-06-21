/*
 * @Author : jaydon
 * @Date   : 2021-06-17 19:39
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import _ from 'lodash';

const defaultProps = {
  inheritAttrs: false
};

// 注册全局组件
const components = require.context('./', true, /index\.vue$/);

components.keys().forEach(key => {
  const component = components(key).default;
  const name = component.name || _.kebabCase(key.replace(/\.\/|index\.vue/g, ''));

  Vue.component(`v-${name}`, _.merge({}, defaultProps, component));
});
