var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', ensureAuthenticated, function (req, res) {
    res.render('index', { title: "Admin Area" });
});

router.get('/login', function (req, res) {
    res.render('login', { title: "Admin - Login", csrfToken: req.csrfToken() });
});

router.post('/login', passport.authenticate('local.signin', { failureRedirect: '/login', failureFlash: true }), function (req, res) {
    if(req.user.level === 0) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated() && req.user.level === 0) {
        next();
    } else {
        res.redirect('/login');
    }
}