var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve('./src'),
  entry: ['babel-polyfill', './app.js'],
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: '../public'
    }])
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      query: {
        presets: ['latest', 'react'],
        plugins: ['transform-class-properties']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }]
  }
}
