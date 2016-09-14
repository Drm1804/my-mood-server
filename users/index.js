let mongoose = require('mongoose');
// let log = require('./log')(module);




var User = function () {

    mongoose.connect('mongodb://localhost/test1');
    var db = mongoose.connection;

    db.on('error', function (err) {
        // log.error('connection error:', err.message);
    });
    db.once('open', function callback () {
        console.log("Connected to DB!");
    });

    var Schema = mongoose.Schema;

    return '{}';
};


module.exports = User;