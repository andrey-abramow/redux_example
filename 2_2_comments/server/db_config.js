const mongoose = require('mongoose')
const APP_CONFIG = require('./app_config')
const connection = mongoose.createConnection(APP_CONFIG.DB_PATH)
module.exports =  {
  connection: connection,
  orm: mongoose,
  Schema: mongoose.Schema
}
