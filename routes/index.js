let users = require('../users');
let passport = require('passport');
let express = require('express');
let log = require('../libs/log.js')(module);
let MoodModel = require('../libs/mongoose').MoodModel;
let UserModel = require('../libs/mongoose').UserModel;

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();


module.exports = function (app) {
    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.use(function(req, res, next){
        console.log('123123');
        next();
    });

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
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        });
    });

    /** Добавить mood*/
    app.post('/api/mood', function (req, res) {

        let mood = new MoodModel({
            name: req.body.title,
            score: req.body.score,
        });

        mood.save(function (err) {
            if (!err) {
                log.info("article created");
                return res.send({status: 'OK', article: mood});
            } else {
                console.log(err);
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });

    });

    /** Получить один mood*/
    app.get('/api/mood/:id', function (req, res) {
        return MoodModel.findById(req.params.id, function (err, mood) {
            if (!mood) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            if (!err) {
                return res.send({status: 'OK', article: mood});
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        });
    });

    /** Редактировать mood*/
    app.put('/api/mood/:id', jsonParser, function (req, res) {
        return MoodModel.findById(req.params.id, function (err, mood) {
            if (!mood) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }

            mood.title = req.body.title;
            mood.score = req.body.score;
            return mood.save(function (err) {
                if (!err) {
                    log.info("article updated");
                    return res.send({status: 'OK', article: mood});
                } else {
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                    }
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        });
    });

    /** Удалить список всех mood*/
    app.delete('/api/mood/:id', function (req, res) {
        return MoodModel.findById(req.params.id, function (err, mood) {
            if (!mood) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            return mood.remove(function (err) {
                if (!err) {
                    log.info("article removed");
                    return res.send({status: 'OK'});
                } else {
                    res.statusCode = 500;
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({error: 'Server error'});
                }
            });
        });
    });


    //
    // Auth
    //


    // app.post('/login', controllers.users.login);

    app.get('/api/user', function(req, res){
        return UserModel.find(function (err, articles) {
            if (!err) {
                return res.send(articles);
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        })
    });


    app.post('/api/user', jsonParser, function(req, res, next){
        const user = new UserModel({ username: req.body.email, password: req.body.password});
        console.log(user);

        user.save(function(err){
            if(!err){
                next(err);
                return res.send({status: 'OK'});
            } else {
                res.statusCode = 500;
                res.send({error: 'Server error'});
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });

    });
    // app.get('/logout', controllers.users.logout);

    // app.get('*', error['404']);
};