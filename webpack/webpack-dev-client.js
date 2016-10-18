var path = require('path');
var webpack = require('webpack');
var config = require('../config');
var loaders = require('./webpack-base');

var assetsPath = path.join(config.baseDir, 'dist', 'assets');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var configure = {
  name: 'client',
  cache: true,
  devtool: 'eval-source-map',
  context: path.join(config.baseDir, 'client'),
  entry: {
    app: ['./client', hotMiddlewareScript]
  },
  output: {
    path: assetsPath,
    filename: 'app.js',
    publicPath: '/assets/'
  },
  module: loaders.commonLoaders,
  resolve: {
    root: [path.join(config.baseDir, 'client')],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false
    })
  ],
  postcss: function () {
    return [];
  }
};
configure.module.loaders.push(loaders.clientStyle);
configure.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    [path.join(config.baseDir, 'client')]
  )
});

module.exports = configure;
