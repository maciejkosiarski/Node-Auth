var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.where({id: id}).fetch().asCallback(function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            User.where({username: username}).fetch().asCallback(function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // save the user
                    new User({ username: username, password: this.generateHash(password) }).save().then(function(user) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

            });
        }));

    passport.use('local-login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            User.where({username: username}).fetch().asCallback(function(err, user) {
                if (err)  return done(err);
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Nie znaleziono takiego użytkownika!'));
                }
                user = user.toJSON();
                if(User.validPassword(password, user.password)){
                    return done(null, false, req.flash('loginMessage', 'Niepoprawne haslo!'));
                }
                return done(null, user);
            }).catch(function(err) {
                console.error(err);
            });
        }
    ));
};
