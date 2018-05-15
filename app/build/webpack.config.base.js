const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolvePath = (rPath) => {
  return path.join(__dirname, rPath)
}

module.exports = {
  entry: {
    main: resolvePath('../src/index.js')
  },
  output: {
    path: resolvePath('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: './chunks/[name].[hash:4].js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.less$/, use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            paths: [
              path.resolve(__dirname, "../node_modules"),
              path.resolve(__dirname, "../src/style/test")
            ]
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@components': resolvePath('../src/components'),
      '@style': resolvePath('../src/style'),
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.html'),
      cache: false,
      inject: true,
      favicon: '',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'dependence',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  devtool: '#eval-source-map',
  target: "electron-renderer"
}