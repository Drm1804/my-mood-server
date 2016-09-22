'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'

    }, function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            // todo переписать логику

            return err
                ? done(err)
                : user
                ? password === user.password
                ? done(null, user)
                : done(null, false, {message: 'Incorrect password.'})
                : done(null, false, {message: 'Incorrect username.'});
        });
    }
));

passport.serializeUser(function () {
    done(null, user.id)
});


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if(err){
            done(err);
        } else {
            done(null, user);
        }
    });
});