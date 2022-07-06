const dotenv = require('dotenv');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

dotenv.config();

module.exports = {
  entry: './front-end/src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(tsx|jsx|ts|js|json|'')$/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './front-end/public/index.html'),
      inject: 'body',
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'public',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css', ''],
  },
};
