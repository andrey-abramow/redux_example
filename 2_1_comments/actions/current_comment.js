import * as types from '../constants/action_types/current_comment'

export function setCurrentComment(comment){
  return { type: types.SET_CURRENT_COMMENT, comment }
}
