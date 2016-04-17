import {
  UPDATE_COMMENT_SUCCESS, GET_COMMENTS_SUCCESS, LOG_EDITED_COMMENT,
  ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS
} from '../constants/action_types/comments'
import { logEditedComment } from '../actions/comments'

const initialState = []

export default function comments(state = initialState, action) {
  let comment

  switch (action.type) {

    case GET_COMMENTS_SUCCESS:
      return [...action.payload.comments]

    case ADD_COMMENT_SUCCESS:
      comment = action.payload.comment
      return [
        {
          id: comment.id,
          author: comment.author,
          text: comment.text
        },
        ...state
      ]

    case DELETE_COMMENT_SUCCESS:
      // return new state array without comment with id == action.id
      return state.filter(comment => comment.id != action.payload.id)

    case UPDATE_COMMENT_SUCCESS:
      comment = action.payload.comment
      return comments(state, logEditedComment(comment)).map(_comment =>
        _comment.id == comment.id ? { ...comment } : _comment
      )

    case LOG_EDITED_COMMENT:
      //console.log('Comment: ' + action.comment.author + action.comment.text + ' - has been edited')
      return state

    default:
      return state
  }
}
