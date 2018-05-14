const path = require('path')
const webpackBase = require('./webpack.config.base')
const merge = require('webpack-merge')

const webpackDev = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, '../src'),
        exclude: /node_modules/,
        options:{
          fix:true,
          quiet:true,
          // emitError:true,
        }
      },
    ],
  },
  plugins: [

  ],
  devServer: {
    port: 2333,
    hot: false,
    inline: true,
    historyApiFallback: true,
    // 去掉不必要的输出信息
    clientLogLevel: "none",
    overlay: {
      warnings: false,
      errors: true,
    },
    contentBase: path.resolve(__dirname, '../src'),
  },
}

module.exports = merge(webpackBase, webpackDev)