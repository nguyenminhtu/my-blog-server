var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var JWT_SECRET = 'tudeptrai';

var User = require('../../models/user');

//user signup
router.post('/signup', function (req, res) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            var user = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                level: 1,
                created_at: new Date()
            });

            user.save(function (err, result) {
                if (err) {
                    res.json("Username or email is already in use. Check again !");
                } else {
                    res.json('ok');
                }
            });
        });
    });
});


//user login
router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if(!user) {
            res.json({ message: "No User Found !" });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if(!result) {
                    res.json({ message: "Wrong Password. Try Again !" });
                } else {
                    var token = jwt.encode(user, JWT_SECRET);
                    res.json({ token: token, message: "ok" });
                }
            })
        }
    });
});

module.exports = router;
