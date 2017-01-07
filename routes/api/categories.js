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
        Post.find({category: category.name}, function (err, posts) {
            res.json(posts);
        });
    });
});


module.exports = router;