var express = require('express');
var tokenFilter = require('./filter/tokenFilter');

var app = express();
app.use(tokenFilter);
app.use('/util', require('./router/util'));
app.use('/self', require('./router/self'));
app.use('/order', require('./router/order'));
app.use('/truck', require('./router/truck'));
app.use('/native', require('./router/native'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error json
    console.log(err);
    res.status(status);
    res.send(err.message);
});

module.exports = app;