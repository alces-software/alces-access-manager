
/* global process, __dirname */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV;

var appName = "alces-access-manager";
var entries, devServer, devtool, outputFile, pathinfo, plugins, publicPath,
    loaders, resolveAlias;

if (env === "production") {
  devtool = "source-map";
  outputFile = appName + ".[hash].min.js";
  pathinfo = false;
  // XXX This needs to match the server address from which the built bundles
  // will be downloaded. If it doesn't, then the browser will attempt to
  // download the zxcvbn chunk from the wrong location.
  publicPath = "/"

  entries = [];

  plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
      __PRODUCTION__: true,
      __DEVELOPMENT__: false,
      __TEST__: false,
      __UNIVERSAL__: false,
    }),
    new ExtractTextPlugin(appName + ".[hash].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        screw_ie8 : true,   // eslint-disable-line camelcase
        warnings: false,
      },
      mangle : {
        screw_ie8 : true,   // eslint-disable-line camelcase
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ];

  loaders = [
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname,
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", "css?sourceMap!resolve-url"),
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style", "css?sourceMap!resolve-url!sass?sourceMap"),
    },
  ]

  resolveAlias = [];

} else {
  devtool = "cheap-module-inline-source-map";
  outputFile = appName + ".js";
  pathinfo = true;
  publicPath = "http://localhost:3001/";

  entries = [
    "webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr",
  ];

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __PRODUCTION__: false,
      __DEVELOPMENT__: true,
      __TEST__: false,
      __UNIVERSAL__: false,
    }),
  ];

  loaders = [
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname,
    },
    {
      test: /\.css$/,
      loader: "style!css?sourceMap!resolve-url",
    },
    {
      test: /\.scss$/,
      loader: "style!css!resolve-url!sass?sourceMap",
    },
  ];

  // In a development environment we want to build and bundle flight-common
  // from a local directory.  The following loader and resolveAlias
  // configurations allow that.
  //
  // This could be replaced with https://github.com/thebeansgroup/webpack-link
  // perhaps that would be the better option.
  loaders.push(
    {
      include: path.resolve(__dirname, '../../flight-common/src'),
      test: /\.js$/,
      loader: "babel",
    }
  );
  resolveAlias = {
    "flight-common/lib": path.resolve(__dirname, '../../flight-common/src'),
    "flight-common": path.resolve(__dirname, '../../flight-common'),
  }
}

module.exports = {
  context: __dirname + '/src',
  devServer: devServer,
  devtool: devtool,
  entry: entries.concat([
    './index',
  ]),
  resolve: {
    root: [
      path.resolve('src'),
      path.resolve('src/modules'),
    ],
    extensions: [
      '', '.js',
    ],
    alias: Object.assign({
      react: path.resolve('./node_modules/react'),
    },
    resolveAlias),
  },
  resolveLoader: {
    root: path.resolve('node_modules'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: publicPath,
    pathinfo: pathinfo,
    filename: outputFile,
  },
  plugins: plugins,
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules|flight-common/},
    ],
    loaders: loaders.concat([
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,    loader: "file-loader" },
      { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,    loader: "file-loader" },
      { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,    loader: "file-loader" },
      { test: /\.png(\?v=[0-9]\.[0-9]\.[0-9])?$/,    loader: "url-loader?limit=100000" },
      { test: /\.ogg$/, loader: "file-loader" },
      { test: /\.md$/,     loaders: ["html", "markdown"]},

      // We now use a fork of react-flipcard installed from Github (to pull in
      // a needed bug fix), however since this contains unbuilt ES6 and JSX
      // sources, and is without its own build instructions, we build this
      // ourselves using our Babel config, which appears to work fine.
      {
        include: path.resolve(__dirname, 'node_modules/react-flipcard/lib'),
        test: /\.js$/,
        loader: "babel",
      },
    ]),
  },
};
