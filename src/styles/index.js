/*
 * @Author : jaydon
 * @Date   : 2021-06-20 00:52
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import variables from './variables.scss';
import { addPrototypeToVue } from '@/utils';
import './index.scss';

// 挂载scss变量
addPrototypeToVue('theme', variables);
