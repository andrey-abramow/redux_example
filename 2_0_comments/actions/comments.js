import * as types from '../constants/action_types'
import fetch from 'isomorphic-fetch'
import { CALL_API } from 'redux-api-middleware'

// without AJAX
//export function deleteComment(id){
//  return { type: types.DELETE_COMMENT, id }
//}
//export function editComment(comment){
//  return { type: types.EDIT_COMMENT, comment }
//}
//export function addComment(comment) {
//  return { type: types.ADD_COMMENT, comment }
//}
export function setCurrentComment(comment){
  return { type: types.SET_CURRENT_COMMENT, comment }
}

export function logEditedComment(comment){
  return { type: types.LOG_EDITED_COMMENT, comment }
}

//export function fetchComments(){
// dispatch(requestComments())
// return fetch('http://localhost:8080/api/comments')
//  .then(response => response.json())
//  .then(json => dispatch(receiveComments(json)))
//}
