import * as types from '../constants/action_types/comments'
import fetch from 'isomorphic-fetch'
import { CALL_API } from 'redux-api-middleware'
const DOMAIN = 'http://localhost:8080'
const PATH = '/api/comments'

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
      endpoint: DOMAIN + PATH,
      method: 'GET',
      types: [
        types.GET_COMMENTS_REQUEST,
        {
          type: types.GET_COMMENTS_SUCCESS,
          payload: (action, state, res) => res.json().then(comments => {
            return { comments: comments }
          })
        },
        types.GET_COMMENTS_FAILURE
      ]
    }
  }
}

// comments/:id : DELETE
export function deleteComment(commentId) {
  return {
    [CALL_API]: {
      endpoint: DOMAIN + PATH + '/' + commentId,
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
      endpoint: DOMAIN + PATH,
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
      endpoint: DOMAIN + PATH + '/' + comment.id,
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
