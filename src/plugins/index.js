/*
 * @Author : jaydon
 * @Date   : 2021-06-17 18:25
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

const plugins = require.context('./', false, /^(?!\.\/index).*\.js$/);

plugins.keys().forEach(plugins);
