const webpack = require('webpack')
const path = require('path')

const config  = {
  entry: [
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
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jade$/, loader: "jade-react"
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: __dirname
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

}
ENV = process.env.NODE_ENV
if (!ENV || ENV == 'development' ) {
  config.entry.unshift('webpack-hot-middleware/client');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  config.module.loaders.unshift({
    test: /\.css$/, loader: "style!css"
  })
}
module.exports = config
