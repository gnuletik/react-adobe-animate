/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackMonitor = require("webpack-monitor");

const common = require("./common");

const { config } = common;

const webpackConfig = {
  entry: config.entry,

  output: config.output,
  resolve: config.resolve,

  module: {
    rules: config.rules,
  },

  plugins: [
    ...config.plugins,
    new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { context: "./static", from: "**/*", to: "./" },
    ]),
  ],
};

if (process.env.MONITOR === "true") {
  webpackConfig.plugins.push(
    new WebpackMonitor({
      capture: true,
      target: "../monitor/stats.json",
      launch: true,
      port: 3030,
    }),
  );
}

module.exports = webpackConfig;
