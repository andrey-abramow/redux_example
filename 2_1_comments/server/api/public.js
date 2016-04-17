const ROOT_PATH = require('app-root-path')
module.exports = app =>
  app.get("/", (req, res) =>
    res.sendFile(ROOT_PATH + '/index.html')
  )
