var express = require('express');
var router = express.Router();

var Category = require('../../models/category');
var Post = require('../../models/post');

router.get('/', function (req, res) {
    Category.find(function (err, categories) {
        res.json(categories);
    });
});

router.get('/:id', function (req, res) {
    Category.findOne({_id: req.params.id}, function (err, category) {
        Post.find({category: req.params.id}, function (err, posts) {
            res.json({ cate: category.name, posts: posts });
        });
    });
});


module.exports = router;