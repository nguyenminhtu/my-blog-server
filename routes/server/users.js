var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

User = require('../../models/user');

router.get('/', ensureAuthenticated, function (req, res) {
    User.find().sort('created_at').exec(function (err, users) {
        res.render('users/users', { title: "Admin - Users", users: users, csrfToken: req.csrfToken() });
    });
});

router.delete('/delete/:id', function (req, res) {
    User.findOneAndRemove({ _id: req.params.id }, function (err, result) {
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
