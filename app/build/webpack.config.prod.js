const merge = require('webpack-merge')
const webpackBase = require('./webpack.config.base')

const webpackProd = {
  mode: 'production',
  plugins: []
}

module.exports = merge(webpackBase, webpackProd)