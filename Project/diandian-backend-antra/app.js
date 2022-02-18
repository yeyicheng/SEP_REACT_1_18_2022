var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require("./public/api.json");
// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({secret: 'conduit', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

if (!isProduction) {
    app.use(errorhandler());
}

if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/diandian');
    mongoose.set('debug', true);
}

require('./models/Tag')
require('./models/User');
require('./models/Article');
require('./models/CoverPath');
require('./models/ArticleCategory');
require('./config/passport');
require('./models/FeedbackForDianDianWeb');
app.use(require('./routes'));


const Article = mongoose.model('Article');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 4 * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    Article.find({}).sort({likedCount: -1}).then((articles) => {
        return Promise.all(articles.map((article, idx) => {
            article.rank = idx + 1;
            return article.save();
            })
        )
    })
});

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    res.json({
        'code': 0,
        'desc': '404未找到'
    });
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        console.log(err.status);
        res.status(err.status || 500);
        if (err.status === 401) {
            res.json({
                'code': -4,
                'desc': '失败',
                'errors': {
                    message: err.message,
                    error: err
                }
            });
        } else {
            res.json({
                'code': 0,
                'desc': '失败',
                'errors': {
                    message: err.message,
                    error: err
                }
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err.status);
    res.status(err.status || 500);
    if (err.status === 401) {
        res.json({
            'code': -4,
            'desc': '失败',
            'errors': {
                message: err.message,
                error: err
            }
        });
    } else {
        res.json({
            'code': 0,
            'desc': '失败',
            'errors': {
                message: err.message,
                error: err
            }
        });
    }
});

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// finally, let's start our server...
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port);
});
