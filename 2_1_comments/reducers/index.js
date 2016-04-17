import { combineReducers } from 'redux'
import comments from './comments'
import currentComment from './current_comment'
const rootReducer = combineReducers({
  comments, currentComment
})

export default rootReducer
