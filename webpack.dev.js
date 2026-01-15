const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["src/**/*.{js,jsx,ts,tsx}", "src/**/*.{html,css}"],
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
});
