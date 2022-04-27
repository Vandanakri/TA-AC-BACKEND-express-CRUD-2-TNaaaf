var express = require('express');
var router = express.Router();

var Blog = require('../models/blog');
var Comment = require('../models/comment');

// Comments

router.get('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render('editComment', { comment });
  });
});

router.post('/:id', function(req, res, next) {
  var id = req.params.id;
  var data = req.body;
  Comment.findByIdAndUpdate(id, data, (err, comment) => {
    if (err) return next(err);
    res.redirect('/blogs/' + comment.blogId);
  });
});

router.get('/:id/delete', function(req,res,next) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, (err,comments)=>{
      if (err) return next(err);
      res.redirect('/blogs/' + comments.blogId)
  })
});

module.exports = router;
