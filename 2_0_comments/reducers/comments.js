import {
  DELETE_COMMENT, UPDATE_COMMENT_SUCCESS, ADD_COMMENT,
  LOG_EDITED_COMMENT, RECEIVE_COMMENTS, ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../constants/action_types'
import { logEditedComment } from '../actions/comments.js'

const initialState = []

export default function comments(state = initialState, action) {
  switch (action.type) {

    case RECEIVE_COMMENTS:
      return [...action.payload.comments]

    case ADD_COMMENT_SUCCESS:
      console.log('ADD_COMMENT_SUCCESS', action)
      return [
        {
          id: state.reduce((maxId, comment) => Math.max(comment.id, maxId), -1) + 1,
          author: action.payload.comment.author,
          text: action.payload.comment.text
        },
        ...state
      ]

    case DELETE_COMMENT_SUCCESS:
      // return new state array without comment with id == action.id
      return state.filter((comment) => comment.id != action.id)

    case UPDATE_COMMENT_SUCCESS:
      console.log('UPDATE_COMMENT_SUCCESS')
      return comments(state, logEditedComment(action.payload.comment)).map(comment =>
        comment.id == action.payload.comment.id ? Object.assign({}, action.payload.comment) : comment
      )

    case ADD_COMMENT:
      return [
      {
        id: state.reduce((maxId, comment) => Math.max(comment.id, maxId), -1) + 1,
        author: action.comment.author,
        text: action.comment.text
      },
      ...state
    ]

    case LOG_EDITED_COMMENT:
      //console.log('Comment: ' + action.comment.author + action.comment.text + ' - has been edited')
      return state

    default:
      return state
  }
}
