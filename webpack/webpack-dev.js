import path from 'path';
import webpack from 'webpack';
import config from '../config';
import getDefaultModules from './webpack-base';

const assetsPath = path.join(config.baseDir, 'dist', 'assets');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const configure = {
  name: 'client',
  cache: true,
  devtool: 'eval-source-map',
  context: path.join(config.baseDir, 'client'),
  entry: {
    app: ['./index', hotMiddlewareScript]
  },
  output: {
    path: assetsPath,
    filename: 'app.js',
    publicPath: '/assets/'
  },
  module: getDefaultModules(),
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

configure.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    [path.join(config.baseDir, 'client')]
  )
});

export default configure;
