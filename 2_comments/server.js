const webpack = require('webpack')
//const mongoose = require('mongoose')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const bodyParser = require('body-parser')
const APP_CONFIG = require('./server/app_config')
const setApi = require('./server/api')

var app = new (require('express'))()

// set middleware
app.use(bodyParser.json({ type: 'application/json' }))
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// set api
setApi(app)

app.listen(APP_CONFIG.PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", APP_CONFIG.PORT, APP_CONFIG.PORT)
  }
})
