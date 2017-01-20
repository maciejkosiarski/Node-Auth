var sha1      = require('locutus/php/strings/sha1');
var bookshelf = require('../config/bookshelf');
var config    = require('../config/app.js');

var User = bookshelf.Model.extend({
    tableName: 'users'
});

User.generateHash = function(password){
    return sha1(config.security.salt+password);
};

User.validPassword = function(password, userPassword){
    if(this.generateHash(password) == userPassword){
        return false
    }
    return true;
};


module.exports = User;


