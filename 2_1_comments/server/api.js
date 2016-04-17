const fs = require('fs')
const API_PATH = __dirname + '/api/'
module.exports = app =>
  fs.readdirSync(API_PATH).forEach(fileName => require(API_PATH + fileName)(app))
