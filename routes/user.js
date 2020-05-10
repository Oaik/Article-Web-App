const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const User = require('../models/users');
const user = require('../controllers/user');
const { check, validationResult, body } = require('express-validator/check');

router.route('/register')
    .get((req,res) => {
        res.render('register');
    })
    .post( user.checkRegist, (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', {
                errors: errors.array()
            });
        }
        let userData = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
        };
        // let createUser = new User(req.body);
        let createUser = new User(userData);
        user.validateLogin(createUser, req, res);
    });

router.route('/login')
    .get((req,res) => {
        res.render('login');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: "Invalid username or password.", 
        successFlash: 'Welcome!' 
    }));

router.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/');
    })

module.exports = router;