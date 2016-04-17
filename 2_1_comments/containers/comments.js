import React, { Component, PropTypes } from 'react'
import Comments from '../components/comments'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import * as CommentsActions from '../actions/comments'
import * as CurrentCommentActions from '../actions/current_comment'
const actions = [CommentsActions, CurrentCommentActions]
class CommentsContainer extends Component {

  componentDidMount() {
    const { fetchComments } = this.props.actions
    // load comment from server
    fetchComments()
  }

  render() {
    const { comments, currentComment, actions } = this.props
    return (
      <div>
        <Comments
          comments={ comments }
          currentComment={ currentComment }
          actions={ actions } />
      </div>
    )
  }
}

CommentsContainer.propTypes = {
  comments: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  currentComment: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log('mapStateToProps')
  // invoked every time when state changes
  // use reselect
  return {
    comments: state.comments,
    currentComment: state.currentComment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ...actions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer)
