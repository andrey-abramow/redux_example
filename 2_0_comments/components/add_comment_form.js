import React, { Component, PropTypes } from 'react'

export default class AddCommentForm extends Component {

  // defatult state for component
  DEFAULT_STATE() { return { author: '', text: '', id: undefined } }

  constructor(props){
    super(props)
    // set initial state on component
    this.state = this.props.comment
  }

  componentWillReceiveProps(newProps={}){
    this.setState(newProps.comment)
  }

  handleChange(e){
    let that = this
    // watch change for all inputs by its name
    Object.keys(this.refs).forEach(function (key) {
      if(that.refs[key] == e.target){
        let comment = that.state
        comment[key] = e.target.value
        that.setState(comment)
      }
    });
  }
  handleSubmit(e){
    e.preventDefault()
    if(this.state.id !== undefined){
      this.props.updateComment(this.state)
    }else{
      this.props.postComment(this.state)
    }
    this.props.setCurrentComment(this.DEFAULT_STATE())
  }

  getButtonText(){
    return this.state.id === undefined ? 'Add' : 'Edit'
  }

  render() {
    return(
      <div className="b-comments__form">
        <h2>Add new comment</h2>
        <div className="b-form">
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input
              className="b-comments__formItem"
              ref="author"
              type="text"
              onChange={ this.handleChange.bind(this) }
              placeholder="Name"
              value={ this.state.author }
            ></input>
            <textarea
              className="b-comments__formItem"
              ref="text"
              onChange={ this.handleChange.bind(this) }
              placeholder="Comment text"
              value={ this.state.text }
            ></textarea>
            <input
              type="submit"
              className="b-comments__formItem-button"
              value={ this.getButtonText() }
            ></input>
          </form>
        </div>
      </div>
    )
  }
}
// for validation, only in dev mode
AddCommentForm.propTypes = {
  postComment: PropTypes.func.isRequired,
  comment: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired,
  updateComment: PropTypes.func.isRequired,
  setCurrentComment: PropTypes.func.isRequired
}
