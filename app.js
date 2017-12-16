var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require("crypto");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var api = require("./api/app");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

function sha1(str) {
	var md5sum = crypto.createHash('sha1');
	md5sum.update(str, "utf8");
	str = md5sum.digest('hex');
	return str;
}

app.get('/pd.html', function(req, res) {
  res.render('pd');
})
app.get('/', function(req, res) {
  var signature = req.query.signature,
      timestamp = req.query.timestamp,
      nonce= req.query.nonce,
      echostr = req.query.echostr,
      token = "zhangjianxin";
  var arr = [token, timestamp, nonce].sort();
  var signStr = arr.join(""),
      signedStr = sha1(signStr);
  if(signedStr == signature) {
    res.send(echostr);
    res.end();
  } else {
    res.status(404);
    res.end();
  }
});

app.get('*', function(req, res) {
  res.render('index', { title: 'Express' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
