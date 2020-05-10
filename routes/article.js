const express = require('express');
const passport = require('passport');
const articleCont = require('../controllers/article')
const router = express.Router();
const Article = require('../models/articles');
const User = require('../models/users');
const { check, validationResult } = require('express-validator/check');


router.get('/add',articleCont.ensureAuth, (req,res) => {
    res.render('add_article', {
        title: "Add Articles"
    })
});

// should be put
router.get('/edit/:id', articleCont.ensureAuth,(req,res) => {
    
    Article.findById(req.params.id, (err, article) => {
        if (req.user._id != article.author) {
            req.flash('danger', 'unAuth you are not the user');
            return res.redirect('/');
        }
        res.render('edit_article', {
            article: article,
            title: 'Edit article'
        });
    });
})

router.get('/:id', (req,res) => {
    Article.findById(req.params.id, (err, article) => {
        User.findById(article.author, (err, user) => {
            res.render('article', {
                article: article,
                author: user.name
            });
        })
        
    });
})

router.post('/add',articleCont.ensureAuth, articleCont.addValidte,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add_article', {
            title: "Add Articles",
            errors: errors.array()
        });
    } else {
        var data = {
            title: req.body.title,
            author: req.user._id,
            body: req.body.body
        };
        var articleAdded = new Article(data);
        //  var articleAdded = new Article(req.body);
        articleAdded.save((err) => {
            if (err) return console.log(err);;
            console.log("Article added");
            req.flash('success', "Article Added");
            res.redirect('/');
        });
    }
});

//TODO: Change it to PUT and update it with ajax(fetch)
router.put('/edit/:id',articleCont.ensureAuth,(req,res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, (err, article) => {
        if (err) return console.log(err);;
        console.log("Article Updated");
        req.flash('success', "Article Updated");
        res.send('ok');
    });
});

router.delete('/:id',articleCont.ensureAuth, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (req.user._id != article.author) {
            req.flash('danger', 'UNAuth you are not the user TO DELETE');
            res.status(500);
            return res.redirect('/');
        }
        Article.findByIdAndRemove(req.params.id, (err, article) => {
            if (err) return console.log(err);
            res.send('OK');
        });
    })
});



module.exports = router;