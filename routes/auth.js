var express     = require('express');
var router      = express.Router();
var passport    = require('passport');

router.get('/login', function(req, res, next) {
    res.render('login', { message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/signup', function(req, res, next) {
    res.render('signup', {  message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/auth/login', // redirect to the secure profile section
    failureRedirect : '/auth/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;