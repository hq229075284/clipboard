const merge = require('webpack-merge')
const webpackBase = require('./webpack.config.base')

const webpackProd = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.min.js',
    }
  },
  plugins: []
}

module.exports = merge(webpackBase, webpackProd)