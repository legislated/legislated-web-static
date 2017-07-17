var webpack = require('webpack')
var path = require('path')
var HtmlPlugin = require('html-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')
var RelayCompilerPlugin = require('relay-compiler-webpack-plugin')

module.exports = function (config) {
  return {
    entry: [
      'babel-polyfill',
      './src/app.js'
    ],
    output: {
      path: path.resolve('./dist'),
      filename: 'bundle-[hash].js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        shared: path.resolve('./src/shared')
      }
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new CleanPlugin([
        'dist'
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          'ENVIRONMENT': JSON.stringify(config.env)
        }
      }),
      new RelayCompilerPlugin({
        src: path.resolve('./src'),
        schema: path.resolve('./schema.json')
      }),
      new HtmlPlugin({
        template: './src/index.ejs',
        favicon: './assets/logo.png'
      }),
      new CopyPlugin([{
        from: 'assets',
        to: 'assets'
      }])
    ],
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          query: {
            name: 'assets/[name].[ext]'
          }
        }, {
          loader: 'image-webpack-loader',
          query: {
            bypassOnDebug: true,
            optimizationLevel: 7,
            interlaced: false
          }
        }]
      }]
    }
  }
}
