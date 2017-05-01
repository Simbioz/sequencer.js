/* global __dirname */

let config = {
  devtool: "source-map",
  resolve: {
    // Allows requiring files with an absolute path
    root: [__dirname],
    extensions: ["", ".js"]
  },
  module: {
    loaders: [
      // Process JS(X) files using Babel
      { test: /\.js$/, loader: "babel", include: [/scripts/], query: { presets: ["es2015"] } },
      // Process JSON files (necessary for client-side NPM dependencies that use json config files)
      { test: /\.json$/, loader: "json" },
    ]
  },
  output: {
    filename: "sequencer.js",
    libraryTarget: "commonjs2"
  }
};

module.exports = config;
