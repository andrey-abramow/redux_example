var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './index.js'
  ],
  node: {
    fs: "empty"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/, loader: "style!css"
      },
      {
        test: /\.jade$/, loader: "jade-react"
      },
      {
        test: /\.json/, loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel' // 'babel-loader' is also a legal name to reference
      },
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      }
    ]
  }
};
