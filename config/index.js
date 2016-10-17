/**
 * Created by rick on 2016/10/13.
 */
'use strict';

var path = require('path');

var baseDir = path.join(__dirname, '..');
var port = 8000;

var config = {
  baseDir: baseDir,
  port: port
};

module.exports = config;
