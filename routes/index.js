var express     = require('express');
var router      = express.Router();

var config = require('../config/app.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { config: config });
});

module.exports = router;

