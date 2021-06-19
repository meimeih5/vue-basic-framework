/*
 * @Author : jaydon
 * @Date   : 2021-06-17 18:25
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import { parseContext } from '@/utils';

// 加载插件
const plugins = require.context('./', false, /^(?!\.\/index).*\.js$/);

module.exports = parseContext(plugins);
