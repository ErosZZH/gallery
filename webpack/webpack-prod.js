var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var webpack = require('webpack');

var config = require('../config');
var loaders = require('./webpack-base');

var assetsPath = path.join(config.baseDir, 'dist', 'assets');
var publicPath = '/assets/';

var babelLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: [
        'transform-decorators-legacy',
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
    },
    include: path.join(config.baseDir, 'client'),
    exclude: path.join(config.baseDir, 'node_modules')
  }
];

var styleLoaders = [
  { test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
  },
  {
    test: /\.sass/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax')
  },
  {
    test: /\.scss/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded')
  },
  {
    test: /\.less/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
  },
  {
    test: /\.styl/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
  }
];

var commonLoaders = babelLoaders.concat(styleLoaders).concat(loaders.commonLoaders.loaders);

var configure = [
  {
    name: 'browser',
    devtool: 'cheap-module-source-map',
    context: path.join(config.baseDir, 'client'),
    entry: {
      app: './client'
    },
    output: {
      path: assetsPath,
      filename: '[name].js',
      publicPath: publicPath
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(config.baseDir, 'client')],
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin('styles/main.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: function () {
      return [];
    }
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(config.baseDir, 'client'),
    entry: {
      server: './server'
    },
    target: 'node',
    output: {
      path: assetsPath,
      filename: 'server.js',
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      root: [path.join(config.baseDir, 'client')],
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/main.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new webpack.IgnorePlugin(/vertx/),
        new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: function () {
      return [];
    }
  }
];

module.exports = configure;
