import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Comments from '../../components/comments'
import CommentItem from '../../components/comment_item'
const comment = { author: 'Me', text: 'comment text', id: 1 }

function setup() {
  let props = {
    actions: {
      updateComment: expect.createSpy(),
      setCurrentComment: expect.createSpy()
    },
    comments: [comment]
  }
  let renderer = TestUtils.createRenderer()
  renderer.render(<Comments { ...props } />)
  let commentsContainer = renderer.getRenderOutput()
  return {
    props,
    commentsContainer,
    renderer
  }

}
const getCommentItems = (commentsContainer) =>
  commentsContainer
    .props.children
    .props.children
    .props.children[1]
    .props.children
    .props.children
    .props.children



describe('components', () => {
  describe('Comments', () => {
    it('should render correctly', () => {
      const { commentsContainer } = setup()
      expect(commentsContainer.type).toBe('div')
      expect(commentsContainer.props.className).toBe('b-container')
      let commentItem = getCommentItems(commentsContainer)[0]
      expect(commentItem.type).toBe(CommentItem)
      expect(commentItem.props.comment).toBe(comment)

    })

    it('should call deleteComment when click on delete comment link', () => {
      const { commentsContainer, props } = setup()
      let commentItem = getCommentItems(commentsContainer)[0]
      commentItem.props.onEdit(comment.id)
      expect(commentItem.type).toBe(CommentItem)
      expect(commentItem.props.comment).toBe(comment)
      expect(props.actions.setCurrentComment.calls.length).toBe(1)
    })

  })
})

