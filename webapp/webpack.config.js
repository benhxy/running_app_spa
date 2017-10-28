var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('main.css')

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: {
    main: ['babel-polyfill', './index.js'],
    html: './index.html',
    vendor: ["react", "react-dom", "react-router", "lodash", "whatwg-fetch"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: '/'
  },

  plugins: [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    })
  ],

  module: {
    loaders: [
      { test: /\.scss$/, loader: extractCSS.extract(['css','sass']) },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(jpg|jpeg|gif|png)$/, exclude: /node_modules/, loader:'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, exclude: /node_modules/, loader: 'file-loader' },
    ]
  },

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  }
}
