import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

export default class CommentItem extends Component {

  deleteComment(e, commentId){
    e.stopPropagation()
    this.props.deleteComment(commentId)
  }

  render() {
    const { comment } = this.props
    return (
      <div className="b-body__item" onClick={ () => this.props.onEdit(comment) }>
        <h3 className="b-body__item-name">{ comment.author }</h3>
        { comment.text }
        <a href="#" onClick={ (e) => this.deleteComment(e, comment.id) } className="b-body__item-delete">Delete comment</a>
      </div>
    )
  }
}
CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  onEdit: PropTypes.func
}
