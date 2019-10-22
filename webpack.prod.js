const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const webpack = require('webpack');

const commonConfig = require('./webpack.config.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build-client-prod'),
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
  },
  devtool: 'source-map',
  cache: true, // better performance for the AggressiveSplittingPlugin
  devServer: {
    contentBase: path.join(__dirname, './build-client-prod/'),
    host: 'localhost',
    port: 8081,
  },
  plugins: [
    // new Dotenv({
    //   path: './.env.prod',
    // }),
    new CleanWebpackPlugin(['build-client-prod'], {
      verbose: true,
    }),
    // @TODO turn on aggresive splitting
    // new webpack.optimize.AggressiveSplittingPlugin({
    //     minSize: 30000,
    //     maxSize: 50000,
    // }),
    new HtmlWebpackPlugin({
      title: 'React App',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        html5: true,
        sortAttributes: true,
        sortClassName: true,
      },
      hash: true,
      template: './index.html',
    }),
  ],
  recordsOutputPath: path.join(__dirname, './build-client-prod/', 'records.json'),
});
