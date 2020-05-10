const { check} = require('express-validator/check');
const bcrypt = require('bcryptjs');

module.exports.checkRegist = [
    check('name').isLength({min: 1}).withMessage('Name field is required'),
    check('username').isLength({min: 1}).withMessage('Username is required'),
    check('password').isLength({min: 1}).withMessage('Password is required'),
    check("checkPassword", "Check Passwords is empty")
    .isLength({ min: 1 })
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // trow error if passwords do not match
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
]

module.exports.validateLogin = function(createUser, req, res) {
    bcrypt.genSalt(10,(err, salt) => {
        if (err) return console.log(err);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return console.log(err);
            createUser.password = hash;
            createUser.save( (err) => {
                if(err) {  
                    req.flash('danger','Username is already existed');
                    res.redirect('/users/register');
                    return;
                } else {
                    req.flash('success','Welcome ' + createUser.name);
                    req.login(createUser, (err) => {
                        if (err) return console.log(err);
                        return res.redirect('/');
                    });
                }
            });
            
        });
    });
}