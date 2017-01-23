var express = require('express');
var router  = express.Router();
var moment  = require('moment');

var config = require('../config/app.js');

/* GET users listing. */
router.get('/profile', isLoggedIn, function(req, res, next) {
    console.log(req.user.attributes);
      res.render('profile', {
            user: req.user.attributes,
            config: config,
            moment:moment
      });
});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
};
