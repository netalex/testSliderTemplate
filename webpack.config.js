const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  module: {
    /*     loaders: [
      { test: /\.dot$/, loader: "dotjs-loader" },
    ], */
    rules: [{
      enforce: "pre",
      test: /.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    }],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: "http://localhost:8080/",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
