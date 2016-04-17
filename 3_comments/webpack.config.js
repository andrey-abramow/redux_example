module.exports = {
  entry: "./index.js",
  node: {
    fs: "empty"
  },
  output: {
    path: './',
    filename: "bundle.js"
  },
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
        //query: {
          //presets: ['react', 'es2015']
        //}
      }
    ]
  }
};
