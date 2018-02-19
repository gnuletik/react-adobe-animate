/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const common = require("./common");

const { config } = common;

module.exports = {
  entry: {
    ...config.entry,
    vendor: [
      ...config.entry.vendor,
      "webpack/hot/only-dev-server",
      // "webpack-dev-server/client?http://192.168.92.212:8080",
      "webpack-dev-server/client?http://localhost:8080",
    ],
  },

  output: config.output,
  resolve: config.resolve,

  devServer: {
    hot: true,
    overlay: true,
    quiet: true,
    historyApiFallback: true,
    contentBase: `${__dirname}/../static`,
  },

  devtool: "#cheap-module-eval-source-map",

  module: {
    rules: config.rules,
  },

  plugins: [
    ...config.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
};
