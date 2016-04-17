const Comment = require('../models/comment')
const PATH = '/api/comments'
const formatCommentRes = comment =>
  Object.assign({}, { id: comment._id, author: comment.author, text: comment.text })

module.exports = function(app) {

  app.get(PATH, (req, res) =>
    Comment.find({}, (err, docs) =>
      res.json(docs.map((comment) => formatCommentRes(comment)))
    )
  )

  app.post(PATH, (req, res) => {
    comment = new Comment(req.body)
    comment.save()
    res.json(formatCommentRes(comment))
  })

  app.put(PATH + '/:id', (req, res) =>
    Comment.findById(req.params.id, (err, comment) => {
      comment = Object.assign(comment, req.body)
      comment.save()
      res.json(formatCommentRes(comment))
    })
  )

  app.delete(PATH + '/:id', (req, res) =>
    Comment.findById(req.params.id, (err, comment) => {
      comment.remove()
      res.json({ id: req.params.id })
    })
  )

}
