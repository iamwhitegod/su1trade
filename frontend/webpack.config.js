const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const htmlTemplateNames = [
  "index",
  "signup",
  "signin",
  "verify",
  "about",
  "ecommerce",
  "email-ecommerce",
  "email-Oauth",
  "exchange",
  "investment",
  "license",
  "news",
  "partners",
  "privacy",
  "resetpassword",
  "security",
  "terms",
  "tutorial",
  "dashboardv2",
  "lend",
  "fundsmanagement",
];
const multipleHtmlTemplates = htmlTemplateNames.map(
  (name) =>
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./src/templates/${name}.html`,
      chunks: [`${name}`],
    })
);

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: "./build",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/templates/index.html",
    }),

    new CleanWebpackPlugin(),
  ].concat(multipleHtmlTemplates),
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
        test: /\.(png|jpe?g|gif|svg|mp4)$/i,
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
