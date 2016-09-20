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

    /** Получить все mood*/
    app.get('/api/mood', function (req, res) {
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

    /** Добавить mood*/
    app.post('/api/mood', function(req, res) {
        // debugger;

        console.dir(req.body);
        // let mood = new MoodModel({
        //     name: req.body.title,
        //     score: req.body.score,
        // });

        // mood.save(function (err) {
        //     if (!err) {
        //         log.info("article created");
        //         return res.send({ status: 'OK', article:mood });
        //     } else {
        //         console.log(err);
        //         if(err.name == 'ValidationError') {
        //             res.statusCode = 400;
        //             res.send({ error: 'Validation error' });
        //         } else {
        //             res.statusCode = 500;
        //             res.send({ error: 'Server error' });
        //         }
        //         log.error('Internal error(%d): %s',res.statusCode,err.message);
        //     }
        // });

        return res.send({ status: 'OK', article:'mood' });
    });

    /** Получить один mood*/
    app.get('/api/articles/:id', function(req, res) {
        res.send('This is not implemented now');
    });

    /** Редактировать mood*/
    app.put('/api/articles/:id', function (req, res){
        res.send('This is not implemented now');
    });

    /** Удалить список всех mood*/
    app.delete('/api/articles/:id', function (req, res){
        res.send('This is not implemented now');
    });



    // app.get('*', error['404']);
};