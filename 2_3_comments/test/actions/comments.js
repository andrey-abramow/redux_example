// Minimalistic BDD assertion toolkit based on should.js
import expect from 'expect'
import thunk from 'redux-thunk'
import nock from 'nock'
import _ from 'lodash'
import configureMockStore from 'redux-mock-store'
import { apiMiddleware } from 'redux-api-middleware'
import * as actions from '../../actions/comments'
import * as types from  '../../constants/action_types/comments'
const middlewares = [ thunk, apiMiddleware ]
const mockStore = configureMockStore(middlewares)

const DOMAIN = 'http://localhost:8080/'
const PATH = '/api/comments'

const compareActions = (store, actionCreatorResult, expectedActions) => {
  return store.dispatch(actionCreatorResult)
    .then(() => {
      expect(store.getActions().map((action) =>
        // remove undefined meta and payload from actions to compare
        _.pick(action, _.negate(_.isUndefined))
      )).toEqual(expectedActions)
    })
  }

describe('actions', () => {
  const newComment = { author: 'Me', text: 'comment text' }
  const comment = { ...newComment, id: 1 }
  const deleteCommentResult = { id: 1 }


  afterEach(() => {
    nock.cleanAll()
  })

  it('creates GET_COMMENTS_SUCCESS action when fetching comments has been done', () => {
    nock(DOMAIN)
      .get(PATH)
      .reply(200, [comment])

    const expectedActions = [
      { type: types.GET_COMMENTS_REQUEST },
      { type: types.GET_COMMENTS_SUCCESS, payload: { comments: [comment] } }
    ]
    const store = mockStore({ comments: [] })
   return compareActions(store, actions.fetchComments(), expectedActions)
  })

  it('creates CREATE_COMMENT_SUCCESS action when created new comment', () => {
    nock(DOMAIN)
      .post(PATH)
      .reply(200, comment)

    const expectedActions = [
      { type: types.ADD_COMMENT_REQUEST },
      { type: types.ADD_COMMENT_SUCCESS, payload: { comment: comment } }
    ]
    const store = mockStore({ comments: [] })
    return compareActions(store, actions.addComment(newComment), expectedActions)
  })

  it('creates UPDATE_COMMENT_SUCCESS action when comment has been updated', () => {
    nock(DOMAIN)
      .put(PATH + '/1')
      .reply(200, comment)

    const expectedActions = [
      { type: types.UPDATE_COMMENT_REQUEST },
      { type: types.UPDATE_COMMENT_SUCCESS, payload: { comment: comment } }
    ]
    const store = mockStore({ comments: [] })
    return compareActions(store, actions.updateComment(comment), expectedActions)
  })

  it('creates DELETE_COMMENT_SUCCESS action when comment has been updated', () => {
    nock(DOMAIN)
      .delete(PATH + '/1')
      .reply(200, deleteCommentResult)

    const expectedActions = [
      { type: types.DELETE_COMMENT_REQUEST },
      { type: types.DELETE_COMMENT_SUCCESS, payload: deleteCommentResult }
    ]
    const store = mockStore({ comments: [] })
    return compareActions(store, actions.deleteComment(comment.id), expectedActions)
  })

})
