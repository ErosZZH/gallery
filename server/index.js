/**
 * Created by rick on 2016/10/11.
 */

'use strict';

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import config from '../config';
import webpackDevConfig from '../webpack/webpack-dev-client';
import homepage from '../dist/assets/server';
import * as api from './api';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(config.baseDir, 'dist')));



app.get('/api/fetch', api.fetchData);
app.post('/api/updateText', api.updateText);

//page 页面路由交给routes
app.get('*', (req, res) => {
  homepage(req, res);
});

//exception
// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

app.listen(config.port);
