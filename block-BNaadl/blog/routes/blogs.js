var express = require('express');
var router = express.Router();
var Article = require('../models/articleModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to blog');
});

router.get('/new', (req, res) => {
  res.render("articlesForm.ejs");
});

router.post('/', (req,res,next) => {
  //capture the data
  Article.create(req.body, (err, articles) => {
      if (err) return res.redirect('/articles/new');
      res.redirect('/');
  })
})

router.get('/:id', (req, res, next) => {
  //single user details
  var id = req.params.id;
  User.findById(id, (err, user) => {
      if (err) return next(err);
      res.render('singleUser.ejs', { user })
  })
})



module.exports = router;
