import styles from "!style!css!./style.css"
import React, { Component, PropTypes } from 'react'
import template from './template.jade'
import { render } from 'react-dom'

//export default class Comments extends Component {
//
//  constructor(props){
//    super(props);
//  }
//  render(){return (template) }
//
//}
var Comments = React.createClass({

  handleClick: function(item) {
    console.log(this);
  },
  render: template

});

Comments.propTypes = {
  items: PropTypes.array.isRequired
};
export default Comments

  //getInitialState: function() {
  //  return {items: [{name: 'wer'}, {name: 'welcome'}], text: ''};
  //},
  //handleClick: function(item) {
  //  console.log(item);
  //},
  //render: template

//});
//export default React.createElement(CommentsContainer)

