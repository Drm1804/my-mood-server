var mongoose = require('mongoose');
var log = require('./log')(module);
var config      = require('../config');


mongoose.connect('mongodb://localhost/test1');

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Mood

var Mood = new Schema({
    name: { type: String, required: true },
    score: { type: String, required: true }
});



var MoodModel = mongoose.model('Mood', Mood);

module.exports.MoodModel = MoodModel;