let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let log = require('./libs/log')(module);
// let middleware = require('./middleware')(app, express);
let config = require('./config');
let routes = require('./routes');

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
routes(app);
app.listen(config.get('port'), function () {
    console.log(`Example app listening on port ${config.get('port')}!`);
});