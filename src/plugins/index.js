/*
 * @Author : jaydon
 * @Date   : 2021-06-17 18:25
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

// 加载插件, 并导出
const plugins = require.context('./', false, /^(?!\.\/index).*\.js$/);

module.exports = plugins.keys().reduce((prev, key) => Object.assign(prev, plugins(key)), {});
