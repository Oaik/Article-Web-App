const { check } = require('express-validator/check');

module.exports.addValidte = [
    check('title').not().isEmpty().withMessage("Title is Required"),
    check('body').isLength({min: 1}).withMessage("Body is Required") 
]


module.exports.ensureAuth = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please Login');
        res.redirect('/users/login');
    }
}