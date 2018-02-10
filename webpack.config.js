const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // Entry files for our popup and background pages
  entry: {
    popup: ["babel-polyfill", "./src/popup.js"],
    background: ["babel-polyfill", "./src/background.js"]
  },
  // Extension will be built into ./dist folder, which we can then load as unpacked extension in Chrome
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  // Here we define loaders for different file types
  module: {
    rules: [
      // We use Babel to transpile JSX
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "./src")],
        loader: 'babel-loader',
        query: {
            presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: "file-loader?limit=100000"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?limit=100000",
          {
            loader: "img-loader",
            options: {
              enabled: true,
              optipng: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // create CSS file with all used styles
    new ExtractTextPlugin("bundle.css"),
    // create popup.html from template and inject styles and script bundles
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["popup"],
      filename: "popup.html",
      template: "./src/popup.html"
    }),
    // copy extension manifest and icons
    new CopyWebpackPlugin([
      { from: "./src/manifest.json" },
      { context: "./src/assets", from: "icon-**", to: "assets" }
    ])
  ]
};
