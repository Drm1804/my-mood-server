let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let log = require('./libs/log')(module);
let config = require('./config');
let routes = require('./routes');
let cookieParser = require('cookie-parser');
let session = require('express-session');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(allowCrossDomain);
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'SECRET' }));
routes(app);
app.listen(config.get('port'), function () {
    console.log(`Example app listening on port ${config.get('port')}!`);
});