/*
 * @Author : jaydon
 * @Date   : 2021-06-17 19:39
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import Vue from 'vue';
import _ from 'lodash';

const defaultProps = {
  inheritAttrs: false
};

// 注册全局组件
const components = require.context('./', true, /index\.(vue|js)$/);

components.keys().forEach(key =>
  _.forEach(components(key), (component, k) => {
    const name = k === 'default' ? component.name || _.kebabCase(key.replace(/\.\/|index\.(vue|js)/g, '')) : k;
    Vue.component(`v-${name.toLowerCase()}`, _.merge({}, defaultProps, component));
  })
);
