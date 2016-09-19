let users = require('../users');
let passport = require('passport');
let getMoons = require('../mood-list');
let express = require('express');
let log = require('../libs/log.js')(module);
let MoodModel    = require('../libs/mongoose').MoodModel;


var LocalStrategy  = require('passport-local').Strategy;

module.exports = function (app) {
    app.use(express.static('public'));

    //
    // Mood
    //
    app.get('/api/mood/', function (req, res) {
        // res.send(getMoons());

        return MoodModel.find(function (err, articles) {
            if (!err) {
                return res.send(articles);
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });


    // app.get('*', error['404']);
};