const pxtrem = require('postcss-pxtrem');

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://ifigure.natapp1.cc',
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
        plugins: [
          pxtrem({
            viewportWidth: 375,
            unitPrecision: 2,
            minPixelValue: 1
          })
        ]
      }
    }
  }
};
