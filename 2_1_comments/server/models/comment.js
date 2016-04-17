const createModel = require('../createModel')
const MODEL_NAME = 'Comment'
const MODEL_MAP = {
  author: String,
  text: String,
  id: Number
}
module.exports = createModel(MODEL_MAP, MODEL_NAME)
