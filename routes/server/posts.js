var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var fs = require('fs');

var csrfProtection = csrf();
router.use(csrfProtection);

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

Post = require('../../models/post');
Category = require('../../models/category');

router.get('/', ensureAuthenticated, function (req, res) {
    Post.find().sort('-created_at').exec(function (err, posts) {
        res.render('posts/posts', { title: "Admin - Post", posts: posts, csrfToken: req.csrfToken() });
    });
});

router.get('/add', ensureAuthenticated, function (req, res) {
    Category.find(function (err, cates) {
        res.render('posts/add', { title: "Admin - Add Posts", cates: cates, csrfToken: req.csrfToken() });
    });
});

router.post('/add', upload.single('image'), function (req, res) {
    Category.findOne({ _id: req.body.category }, function (err, cate) {
        var post = new Post({
            title: req.body.title,
            category: req.body.category,
            category_name: cate.name,
            description: req.body.description,
            image: req.file.originalname,
            content: req.body.content,
            created_at: new Date()
        });

        post.save(function (err, result) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/posts');
            }
        });
    });
});

router.get('/edit/:id', ensureAuthenticated, function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        Category.find(function (err, cates) {
            res.render('posts/edit', { title: "Admin - Edit Post", cates: cates, post: post, csrfToken: req.csrfToken() });
        });
    });
});

router.post('/edit/:id', upload.single('image'), function (req, res) {
    var image;
    if(req.file) {
        image = req.file.originalname;
        // fs.unlink('./public/uploads/'+req.body.old_image, function (err) {
        //     if (err) {
        //         return console.log("Error is: " + err);
        //     }
        //     console.log("Deleted image !");
        // });
    }else{
        image = req.body.old_image;
    }

    Category.findOne({ _id: req.body.category }, function (err, cate) {
        Post.findOneAndUpdate({ _id: req.params.id },
            { $set: { title: req.body.title, category: req.body.category, category_name: cate.name, description: req.body.description, image: image, content: req.body.content } },
            { safe: true, upsert: true },
            function (err, result) {
                if(err) {
                    console.log(err);
                }else{
                    res.redirect('/posts');
                }
            });
    });
});

router.delete('/delete/:id', function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        Post.findOneAndRemove({ _id: req.params.id }, function (err, result) {
            if(err) {
                console.log(err);
            }else{
                // fs.unlink('./public/uploads/'+post.image, function (err) {
                //     if(err) {
                //         return console.log(err);
                //     }
                //     console.log("Delete image successfully !");
                // });
                res.send('ok');
            }
        });
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
