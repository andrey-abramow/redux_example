const DB_CONFIG = require('./db_config')
module.exports = (modelMap, modelName) => {
  const modelSchema = new DB_CONFIG.Schema(modelMap)
  DB_CONFIG.orm.model(modelName, modelSchema)
  return DB_CONFIG.connection.model(modelName, DB_CONFIG.Schema)
}
