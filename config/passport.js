const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

module.exports = function (passport){ 
    
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({username: username}, (err, user) => {
                if (err) return done(err);
                if (!user) return done(null, false, 'No username found');
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw new Error("Error occured while login");
                    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
                    return done(null, user);
                });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}