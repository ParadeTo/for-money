var path = require("path");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
const paths = require("../paths");
var browserConfig = {
  name: "client",
  entry: {
    bundle: ["./src/browser/index.js"]
  },
  mode: "development",
  devtool: "cheap-eval-source-map",
  output: {
    path: paths.clientBuild,
    filename: "[name].js",
    publicPath: paths.publicPath
  },
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ],
  stats: {
    colors: true
  }
};

var serverConfig = {
  name: "server",
  entry: "./src/server/index.js",
  target: "node",
  mode: "development",
  externals: [nodeExternals()],
  devtool: "cheap-eval-source-map",
  output: {
    path: paths.serverBuild,
    filename: "server.js",
    publicPath: paths.publicPath
  },
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    colors: true
  }
};

module.exports = [browserConfig, serverConfig];
