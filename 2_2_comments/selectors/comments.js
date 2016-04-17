import { createSelector } from 'reselect'

export default createSelector(
  state => state.comments,
  (comments) => {
    console.log('comments changed')
    return comments
  }
)
