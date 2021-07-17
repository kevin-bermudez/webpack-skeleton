const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const basePath = __dirname;
const distPath = 'dist';

const indextInput = './src/index.html';
const indexOutput = 'index.html';

const webpackInitConfig = {
  mode: 'development',
  resolve: {
    extensions: ['.js','.ts']
  },
  entry: {
    app: ['@babel/polyfill','./src/index.js'],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: '[chunkhash][name].js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader','eslint-loader']
      },
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtract.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.sass/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtract.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
        filename: indexOutput, 
        template: indextInput,
    }),
    new MiniCSSExtract({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new LiveReloadPlugin({
      appendScriptTag : true
    })
  ]
};
module.exports = webpackInitConfig;