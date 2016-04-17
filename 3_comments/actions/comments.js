import * as types from '../constants/action_types'

export function removeComment(id){
  return { type: tyeps.REMOVE_COMMENT, id}
}
export function cloneComment(id){
  return { type: tyeps.CLONE_COMMENT, id}
}
