const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

const commonConfig = require('./webpack.config.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build-client-dev'),
  },
  devtool: 'eval-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  },
  devServer: {
    contentBase: path.join(__dirname, './build-client-dev/'),
    host: 'localhost',
    port: 8081,
  },
  plugins: [
    // new Dotenv({
    //   path: './.env.dev',
    // }),
    new CleanWebpackPlugin(['build-client-dev'], {
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      title: 'React App',
      hash: true,
      template: './index.html',
    }),
  ],
});
