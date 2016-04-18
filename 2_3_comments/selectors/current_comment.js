import { createSelector } from 'reselect'

export default createSelector(
    state => state.currentComment,
  (currentComment) => {
    console.log('currentComment changed')
    return currentComment
  }
)
