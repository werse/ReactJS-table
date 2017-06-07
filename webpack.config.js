const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const excludedModules = /(node_modules|bower_components)/;
const localIdentName = '[name]-[local]-[hash:base64:8]';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public/generated');
var APP_DIR = path.resolve(__dirname, 'public/app');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  })
];

const rules = [{
  test: /\.jsx?/,
  include: APP_DIR,
  loader: 'babel-loader'
}];

const config = {
  entry: `${APP_DIR}/app.jsx`,
  output: {
    filename: 'js6-react-bundle.js',
    path: `${BUILD_DIR}`
  },

  module: {
    rules
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },

  plugins: plugins,

  watch: isDev,

  devtool: isDev ? 'source-map' : false,

  watchOptions: {
    aggregateTimeout: 100
  }
};

module.exports = config;
