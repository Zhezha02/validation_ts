const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  watch: true,
  entry: './src/script.ts',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: '[name].min.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
/*  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
  ],*/
};