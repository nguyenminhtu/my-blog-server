var express = require('express');
var router = express.Router();

var Post = require('../../models/post');

router.get('/', function (req, res) {
    Post.find().sort('-date').exec(function (err, posts) {
        res.json(posts);
    });
});

router.get('/:id', function (req, res) {
    Post.findOne({_id: req.params.id}, function (err, post) {
        if (err) {
            res.json(err);
        } else {
            res.json(post);
        }
    });
});

module.exports = router;
