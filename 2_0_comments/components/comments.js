import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import CommentItem from './comment_item'
import AddCommentForm from './add_comment_form'
import styles from "!style!css!./style.css"

export default class Comments extends Component {

  renderHeader() {
    return (
      <div className="b-comments__header">
        <h2>Comments list</h2>
      </div>
    )
  }

  render() {
    const { comments, currentComment, actions } = this.props
    return (
      <div className="b-container">
        <div className="b-container__comments">
          <div className="b-comments">
            { this.renderHeader() }
            <div className="b-comments__body">
              <div className="b-body">
                <fieldset>
                  {comments.map(comment =>
                      <CommentItem comment={ comment } onEdit={ () => actions.setCurrentComment(comment) } { ...actions } />
                  )}
                </fieldset>
              </div>
            </div>
            <AddCommentForm
              comment={ currentComment }
              { ...actions }/>
          </div>
        </div>
      </div>
    )
  }
}
Comments.propTypes = {
  currentComment: PropTypes.object,
  comments: PropTypes.array.isRequired
}
