var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

Category = require('../../models/category');

router.get('/', ensureAuthenticated, function (req, res) {
    Category.find().sort('-created_at').exec(function (err, cates) {
        res.render('categories/categories', { title: "Admin - Category", categories: cates, csrfToken: req.csrfToken() });
    });
});

router.get('/add', ensureAuthenticated, function (req, res) {
    res.render('categories/add', { title: "Admin - Add Category", csrfToken: req.csrfToken() });
});

router.post('/add', function (req, res) {
    var cate = new Category({
        name: req.body.name,
        created_at: new Date()
    });

    cate.save(function (err, result) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/categories');
        }
    });
});

router.get('/edit/:id', ensureAuthenticated, function (req, res) {
    Category.findOne({ _id: req.params.id }, function (err, cate) {
        res.render('categories/edit', { title: "Admin - Edit Category", category: cate, csrfToken: req.csrfToken() })
    });
});

router.post('/edit/:id', function (req, res) {
    Category.findOneAndUpdate({ _id: req.params.id },
        { $set: { name: req.body.name } },
        { safe: true, upsert: true },
    function (err, result) {
        if(err) {
            console.log(err);
        }else{
            res.redirect('/categories');
        }
    });
});

router.delete('/delete/:id', function (req, res) {
    Category.findOneAndRemove({ _id: req.params.id }, function (err, result) {
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