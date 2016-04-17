import { SET_CURRENT_COMMENT } from '../constants/action_types'

const initialState = { author: '', text: '' }

export default function currentComment(state = initialState, action) {

  switch (action.type) {

    case SET_CURRENT_COMMENT:
      return Object.assign({}, action.comment)

    default:
      return state
  }

}
