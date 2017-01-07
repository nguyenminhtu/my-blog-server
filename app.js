var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./config/passport');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:123456@ds145828.mlab.com:45828/finalproject');

//server route
var index = require('./routes/server/index');
var users = require('./routes/server/users');
var posts = require('./routes/server/posts');
var categories = require('./routes/server/categories');

//api route
var apiUsers = require('./routes/api/users');
var apiPosts = require('./routes/api/posts');
var apiCategories = require('./routes/api/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(flash());
app.use(session({
    secret: "tudeptrai",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.messages = require('express-messages')(req, res);
    res.locals.moment = require('moment');
    next();
});


app.get('/public/uploads/:image', function (req, res) {
    res.sendFile(__dirname + '/public/uploads/'+req.params.image);
});

//api router
app.use('/api/v1/users', apiUsers);
app.use('/api/v1/posts', apiPosts);


app.use('/api/v1/categories', apiCategories);
//server route
app.use('/users', users);
app.use('/posts', posts);
app.use('/categories', categories);

app.use('/', index);

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    contents = fs.readFileSync("sliderImages.json", "utf8");
    console.log(path.join(__dirname, '/sliderImages.json'));
    res.end(contents);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
