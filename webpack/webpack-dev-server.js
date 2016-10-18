var path = require('path');
var webpack = require('webpack');
var config = require('../config');
var loaders = require('./webpack-base');

var assetsPath = path.join(config.baseDir, 'dist', 'assets');

var configure = {
  // The configuration for the server-side rendering
  name: 'server-side rendering',
  cache: true,
  context: path.join(config.baseDir, 'client'),
  entry: {
    server: './server'
  },
  target: 'node',
  output: {
    path: assetsPath,
    filename: 'server.js',
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
  },
  module: loaders.commonLoaders,
  resolve: {
    root: [path.join(config.baseDir, 'client')],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    }),
    new webpack.IgnorePlugin(/vertx/)
  ]
};
configure.module.loaders.push(loaders.serverStyle);
configure.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [].concat(
    [path.join(config.baseDir, 'client')]
  )
});

module.exports = configure;
