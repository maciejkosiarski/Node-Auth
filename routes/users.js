var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', { user: req.user.attributes});
});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
};
