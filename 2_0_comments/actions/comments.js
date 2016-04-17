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

export function fetchComments() {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:8080/api/comments',
      method: 'GET',
      types: [
        types.REQUEST_COMMENTS,
        {
          type: types.RECEIVE_COMMENTS,
          payload: (action, state, res) => res.json().then(comments => {
            return { comments: comments }
          })
        },
        types.REQUEST_COMMENTS_FAILURE
      ]
    }
  }
}

//export function fetchComments(){
// dispatch(requestComments())
// return fetch('http://localhost:8080/api/comments')
//  .then(response => response.json())
//  .then(json => dispatch(receiveComments(json)))
//}

// comments/:id : DELETE
export function deleteComment(commentId) {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:8080/api/comments/' + commentId,
      method: 'DELETE',
      types: [
        types.DELETE_COMMENT_REQUEST,
        {
          type: types.DELETE_COMMENT_SUCCESS,
          payload: (action, state, res) => res.json().then(payload => payload)
        },
        types.DELETE_COMMENT_FAILURE
      ]
    }
  }
}
// comments/:id : POST
export function addComment(comment) {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:8080/api/comments',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(comment),
      types: [
        types.ADD_COMMENT_REQUEST,
        {
          type: types.ADD_COMMENT_SUCCESS,
          payload: (action, state, res) => res.json().then(comment => {
            return { comment: comment }
          })
        },
        types.ADD_COMMENT_FAILURE
      ]
    }
  }
}
// comments/:id : PUT
export function updateComment(comment) {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:8080/api/comments/' + comment.id,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(comment),
      types: [
        types.UPDATE_COMMENT_REQUEST,
        {
          type: types.UPDATE_COMMENT_SUCCESS,
          payload: (action, state, res) => res.json().then(comment => {
            return { comment: comment }
          })
        },
        types.UPDATE_COMMENT_FAILURE
      ]
    }
  }
}
