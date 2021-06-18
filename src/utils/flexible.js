/*
 * @Author : jaydon
 * @Date   : 2021-06-17 11:18
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

(function() {
  var n = window,
    e = n.document,
    t = e.documentElement,
    o = 'orientationchange' in n ? 'orientationchange' : 'resize',
    a = function() {
      var w = Math.min(t.clientWidth, 750);
      t.style.fontSize = w / 10 + 'px';
    };
  e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener('DOMContentLoaded', a, !1));
})();

// const dev = process.env.NODE_ENV !== 'production';
// if (dev) {
//   import('vconsole').then(Vconsole => new Vconsole.default());
// }
