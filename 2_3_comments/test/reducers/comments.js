import expect from 'expect'
import reducer from '../../reducers/comments'
import * as types from  '../../constants/action_types/comments'

const comment = { author: 'Me', text: 'comment text', id: 1 }

const addCommentActionCreator = (comment) => {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    payload: { comment: comment }
  }
}

const deleteCommentActionCreator = (commentId) => {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    payload: { id: commentId }
  }
}

describe('comments reducer', () => {

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_COMMENT_SUCCESS', () => {
    expect(reducer([], addCommentActionCreator(comment))).toEqual([comment])
  })

  it('should handle DELETE_COMMENT_SUCCESS', () => {
    expect(reducer([comment], deleteCommentActionCreator(comment.id))).toEqual([])
  })

})
