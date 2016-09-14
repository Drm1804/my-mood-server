let users = require('../users');
let express = require('express');

module.exports = function (app) {
    app.use(express.static('public'));

    app.get('/api/users', function(req, res){
       res.send(users());

    });

    // app.get('*', error['404']);
};