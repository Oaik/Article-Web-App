// TODO:
// D: Controller folder to organize the app
// Error handel
// (JS minfy+ styls) + Grunt
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/config');
const bcrypt = require('bcryptjs');

const app = express();

const Article = require('./models/articles');
require('./init/init');
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
let db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log("Connected to DB"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// express messges
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use( (req, res, next) => {
    res.locals.user = req.user;
    next();
});

let articleRoute = require('./routes/article.js'),
    userRoute = require('./routes/user');
app.use('/articles', articleRoute);
app.use('/users', userRoute);

app.get('/', (req, res) => {
    Article.find({}, (err, articles, next) => {
        if (err) throw new Error();
        res.render('index', {
            title: "Articles",
            articles: articles
        });
    });
});

// app.use((req,res,err,next) => {
//     res.status(500, "Error Occured");
//     console.log(err);
// })

app.listen(5000, () => {
    console.log("Running on Port 5000");
})