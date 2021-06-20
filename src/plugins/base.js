/*
 * @Author : jaydon
 * @Date   : 2021-06-17 11:18
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import qs from 'query-string';

(function flexible() {
  const n = window,
    e = n.document,
    t = e.documentElement,
    o = 'orientationchange' in n ? 'orientationchange' : 'resize',
    a = () => {
      const w = Math.min(t.clientWidth, 750);
      t.style.fontSize = w / 10 + 'px';
    };
  e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener('DOMContentLoaded', a, !1));
})();

(function vconsole() {
  const { debug } = qs.parse(location.href.split('?')[1]);
  if (debug) {
    import('vconsole').then(vconsole => new vconsole.default());
  }
})();
