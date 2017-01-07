var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
const JWT_SECRET = 'tudeptrai';

var Comment = require('../../models/comment');

router.post('/add', function (req, res) {
    var token = req.body.token;
    var user = jwt.decode(token, JWT_SECRET);

    var comment = new Comment({
        user: user._id,
        username: user.username,
        post: req.body.postid,
        post_title: req.body.posttitle,
        content: req.body.content,
        created_at: req.body.created_at
    });

    comment.save(function (err, result) {
        if(err) {
            res.json({ message: "Error when post comment !" });
        } else {
            res.json({ message: "ok" });
        }
    });
});

module.exports = router;
