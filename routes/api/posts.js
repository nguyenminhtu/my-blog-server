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
        Comment.find({ post: req.params.id }).sort('-created_at').exec(function (err, comments) {
            if(err) {
                res.json({ message: "Error when get data from server !" });
            } else {
                res.json({ post: post, comments: comments });
            }
        });
    });
});

module.exports = router;
