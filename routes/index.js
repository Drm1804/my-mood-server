// let main = require('./api');
let express = require('express');

module.exports = function (app) {
    app.use(express.static('public'));

    // app.get('*', error['404']);
};