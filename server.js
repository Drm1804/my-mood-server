let express = require('express');
let app = express();
// let middleware = require('./middleware')(app, express);
let config = require('./config');
let routes = require('./routes');
// let log = require('./utils/log')(app, module);

console.log(config.get('port'));
routes(app);
app.listen(config.get('port'), function () {
    console.log(`Example app listening on port ${config.get('port')}!`);
});