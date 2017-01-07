var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

Comment = require('../../models/comment');

router.get('/', ensureAuthenticated, function (req, res) {
    Comment.find().sort('-created_at').exec(function (err, comments) {
        res.render('comments/comments', { title: "Admin - Comments", comments: comments, csrfToken: req.csrfToken() });
    });
});

router.delete('/delete/:id', function (req, res) {
    Comment.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if(err) {
            console.log(err);
        }else{
            res.send('ok');
        }
    });
});


module.exports = router;

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated() && req.user.level === 0) {
        next();
    } else {
        res.redirect('/login');
    }
}