const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-cheap-module-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "popup/build", to: "popup" },
        { from: "chrome/icons", to: "icons" },
        { from: "chrome/manifest.json", to: "manifest.json" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    chunkLoading: false,
    wasmLoading: false,
  },
  target: ["web", "es5"],
};
