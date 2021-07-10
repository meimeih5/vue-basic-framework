/*
 * @Author : jaydon
 * @Date   : 2021-06-20 00:52
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import { addPrototypeToVue } from '@/utils';
import variables from './variables.scss';
import 'doui-vue/dist/doui-vue.css';
import './index.scss';

// 挂载scss变量
addPrototypeToVue('themes', variables);
