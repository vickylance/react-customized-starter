const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js',
    sourceMapFilename: 'js/[name].[hash:8].map',
    chunkFilename: 'js/[id].[hash:8].js',
  },
  cache: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: [['@babel/env', { targets: { node: 6 } }]],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'React App',
      // minify: {
      //   collapseWhitespace: true,
      //   collapseBooleanAttributes: true,
      //   collapseInlineTagWhitespace: true,
      //   html5: true,
      //   sortAttributes: true,
      //   sortClassName: true,
      // },
      // hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.optimize.AggressiveSplittingPlugin({
      minSize: 30000,
      maxSize: 50000,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  // recordsOutputPath: path.join(__dirname, 'dist', 'records.json'),
};
