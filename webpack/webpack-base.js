'use strict';

var path = require('path');
var config = require('../config');

var srcPath = path.join(config.baseDir, 'client');

module.exports = {
  commonLoaders: {
    // preLoaders: [{
    //   test: /\.(js|jsx)$/,
    //   include: srcPath,
    //   loader: 'eslint-loader'
    // }],
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        query: {
          name: '[hash].[ext]',
          limit: 8192
        }
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  clientStyle: [
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    },
    {
      test: /\.sass/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    },
    {
      test: /\.scss/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
    },
    {
      test: /\.less/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'
    },
    {
      test: /\.styl/,
      loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
    }
  ],
  serverStyle: [
    {
      test: /\.css$/,
      loader: 'isomorphic-style-loader!css-loader!postcss-loader'
    },
    {
      test: /\.sass/,
      loader: 'isomorphic-style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    },
    {
      test: /\.scss/,
      loader: 'isomorphic-style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
    },
    {
      test: /\.less/,
      loader: 'isomorphic-style-loader!css-loader!postcss-loader!less-loader'
    },
    {
      test: /\.styl/,
      loader: 'isomorphic-style-loader!css-loader!postcss-loader!stylus-loader'
    }
  ]
};

