/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const packagejson = require("../package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");

const path = require("path");
const webpack = require("webpack");

const iP = process.env.NODE_ENV === "production";

const HtmlWebpackPluginConfig = {
  template: HtmlWebpackTemplate,
  inject: false,
  filename: "index.html",

  ...packagejson.config,
};

module.exports = {
  iP,
  config: {
    entry: {
      app: "./src/index.js",
      vendor: ["react", "react-dom"],
    },

    output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].[hash].js",
    },

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],

    plugins: [
      new webpack.DefinePlugin({
        "process.env.VERSION": JSON.stringify(packagejson.version),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
    ],
  },
};
