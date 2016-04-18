import {
  DELETE_COMMENT, UPDATE_COMMENT, ADD_COMMENT,
  LOG_EDITED_COMMENT, RECEIVE_COMMENTS
} from '../constants/action_types'
import { logEditedComment } from '../actions/comments.js'

const initialState = []

export default function comments(state = initialState, action) {
  switch (action.type) {

    case RECEIVE_COMMENTS:
      return [...action.comments]

    case ADD_COMMENT:
      return [
        {
          id: state.reduce((maxId, comment) => Math.max(comment.id, maxId), -1) + 1,
          author: action.comment.author,
          text: action.comment.text
        },
        ...state
      ]

    case DELETE_COMMENT:
      // return new state array without comment with id == action.id
      return state.filter((comment) => comment.id != action.id)

    case UPDATE_COMMENT:
      return comments(state, logEditedComment(action.comment)).map(comment =>
        comment.id == action.comment.id ? Object.assign({}, action.comment) : comment
      )

    case LOG_EDITED_COMMENT:
      //console.log('Comment: ' + action.comment.author + action.comment.text + ' - has been edited')
      return state

    default:
      return state
  }
}
