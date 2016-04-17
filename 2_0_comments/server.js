var webpack = require('webpack')
var mongoose = require('mongoose')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var bodyParser = require('body-parser')

var connection = mongoose.createConnection('mongodb://localhost:27017/react_comments')
var Schema  = mongoose.Schema
var CommentSchema = new Schema({
  author: String,
  text: String,
  id: Number
})
mongoose.model('Comment', CommentSchema)
var Comment = connection.model('Comment', Schema)
var instance  = new Comment({author: 'fwewf', text: 'sfsdfdf'})
Comment.find({}, (err, docs) => console.log(err, docs))
var app = new (require('express'))()
app.use(bodyParser.json({ type: 'application/json' }))
var port = 8080

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get("/api/comments", function(req, res) {
  Comment.find({}, (err, docs) => res.json(docs.map((comment) => Object.assign({},{ id: comment._id, author: comment.author, text: comment.text }))))
})

app.post("/api/comments", function(req, res) {
  newComment = new Comment(req.body)
  newComment.save()
  res.json(Object.assign({}, { id: newComment._id, author: newComment.author, text: newComment.text }))
})

app.put("/api/comments/:id", function(req, res) {
  Comment.find({ _id: req.params.id }, (err, comments) => {
      comment = comments[0]
      comment = Object.assign(comment, req.body)
      comment.save
      res.json(Object.assign({},{ id: comment._id, author: comment.author, text: comment.text }))
    }
  )
})
app.delete("/api/comments/:id", function(req, res){
  Comment.find({ _id: req.params.id }, (err, comments) => {
    comments[0].remove()
    res.json({ id : comments[0].id} )
  })
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
