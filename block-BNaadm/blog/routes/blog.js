var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();

var Blog = require('../models/blog');
var comment = require('../models/comment');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send("welcome to blog")
});

router.get('/new', function (req, res, next) {
  res.render("userForm.ejs");
});

router.post('/', function (req, res, next) {
  //capture the data
  Blog.create(req.body, (err, blog) => {
    if (err) return next(err);
    res.redirect('/blogs');
  })
})

router.get('/:id', function (req, res, next) {
  //single user details
  var id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) return next(err);
    comment.find({ blogId: id }, (err, comment) => {
      res.render('singleBlog.ejs', { blog })
    })
  })
});

router.get('/:id/edit', function (req, res, next) {
  //edit form
  var id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) return next(err);
    res.render('editUser.ejs', { user })
  });
});

router.post('/:id', function (req, res, next) {
  //capture the data from update form
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blog/' + id);
  });
});

router.get("/:id/delete", function (req, res, next) {
  //delete that user
  var id = req.params.id;
  Blog.findByIdAndDelete(id, (err, blog) => {
    if (err) return next(err);
    res.redirect('/blog')
  })
});

//Add comment
router.post('/:id/comment', function (req, res, next) {
  var id = req.params.id;
  req.body.blogId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect('/blog/' + id)
  })
});

//Routes for like
router.get('/click/:id/likes', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { likes: +1 } }, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  })
});

//Routes for like
router.get('/click/:id/dislikes', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { dislikes: +1 } }, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  })
});





module.exports = router;
