/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

const path = require('path');

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://www.ifigure.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: []
      },
      sass: {
        prependData: `@import "@/styles/variables.scss", "@/styles/mixin.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@images': '@/assets/images',
        '@locales': '@/assets/locales',
        '@variables.scss': '@/styles/variables.scss'
      }
    }
  }
};
