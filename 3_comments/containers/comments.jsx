import React, { Component, PropTypes } from 'react'
import Comments from '../components/comments.jsx'
import { connect } from 'react-redux'
import { render } from 'react-dom'

class CommentsContainer extends Component {

  constructor() {
    super();
    this.state = { comments: [] }
  }

  componentDidMount() {
    this.setState({comments: [{name: 'wer'}, {name: 'welcome'}]})
  }

  render() {
    return <Comments comments={this.state.comments}/>
  }

}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    comments: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default React.createElement(CommentsContainer)
