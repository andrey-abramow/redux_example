import * as types from '../constants/action_types'
import fetch from 'isomorphic-fetch'

export function deleteComment(id){
  return { type: types.DELETE_COMMENT, id }
}
export function updateComment(comment){
  return { type: types.UPDATE_COMMENT, comment }
}
export function addComment(comment) {
  return { type: types.ADD_COMMENT, comment }
}
export function setCurrentComment(comment){
  return { type: types.SET_CURRENT_COMMENT, comment }
}

export function logEditedComment(comment){
  return { type: types.LOG_EDITED_COMMENT, comment }
}

// comments: GET
function requestComments(){
  return {
    type: types.REQUEST_COMMENTS
  }
}

function receiveComments(comments){
  return {
    type: types.RECEIVE_COMMENTS,
    comments: [...comments]
  }
}
export function fetchComments(){
  return (dispatch) => {
    dispatch(requestComments())
    return fetch('http://localhost:8080/api/comments')
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
  }
}
