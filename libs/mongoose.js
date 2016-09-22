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

var MoodSchema = new Schema({
    name: { type: String, required: true },
    score: { type: String, required: true }
});

// User

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



var UserModel = mongoose.model('User', UserSchema);
var MoodModel = mongoose.model('Mood', MoodSchema);

module.exports.MoodModel = MoodModel;
module.exports.UserModel = UserModel;