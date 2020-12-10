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
      filename: "signin.html",
      template: "./signin.html",
    }),

    new HtmlWebpackPlugin({
      filename: "verify.html",
      template: "./verify.html",
    }),

    new HtmlWebpackPlugin({
      filename: "resetpassword.html",
      template: "./resetpassword.html",
    }),

    new HtmlWebpackPlugin({
      filename: "investment.html",
      template: "./investment.html",
    }),

    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./about.html",
    }),

    new HtmlWebpackPlugin({
      filename: "tutorial.html",
      template: "./tutorial.html",
    }),

    new HtmlWebpackPlugin({
      filename: "ecommerce.html",
      template: "./ecommerce.html",
    }),

    new HtmlWebpackPlugin({
      filename: "exchange.html",
      template: "./exchange.html",
    }),

    new HtmlWebpackPlugin({
      filename: "partners.html",
      template: "./partners.html",
    }),

    new HtmlWebpackPlugin({
      filename: "privacy.html",
      template: "./privacy.html",
    }),

    new HtmlWebpackPlugin({
      filename: "license.html",
      template: "./license.html",
    }),

    new HtmlWebpackPlugin({
      filename: "terms.html",
      template: "./terms.html",
    }),

    new HtmlWebpackPlugin({
      filename: "news.html",
      template: "./news.html",
    }),

    new HtmlWebpackPlugin({
      filename: "email-verify-email.html",
      template: "./email-verify-email.html",
    }),

    new HtmlWebpackPlugin({
      filename: "email-ecommerce.html",
      template: "./email-ecommerce.html",
    }),

    new HtmlWebpackPlugin({
      filename: "email-Oauth.html",
      template: "./email-Oauth.html",
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
