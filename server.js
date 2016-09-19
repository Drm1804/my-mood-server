let express = require('express');
let app = express();
let log = require('./libs/log')(module);
// let middleware = require('./middleware')(app, express);
let config = require('./config');
let routes = require('./routes');


routes(app);
app.listen(config.get('port'), function () {
    console.log(`Example app listening on port ${config.get('port')}!`);
});