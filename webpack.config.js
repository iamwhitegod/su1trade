const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),

    new HtmlWebpackPlugin({
      filename: "signup.html",
      template: "./signup.html",
    }),

    new HtmlWebpackPlugin({
      filename: "investment.html",
      template: "./investment.html",
    }),

    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./about.html",
    }),

    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name], [ext]",
            output: "images",
            publicPath: "images/",
          },
        },
      },
    ],
  },
};
