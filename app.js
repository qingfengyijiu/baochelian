var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require("crypto");
var logger = require("./logger")();

var index = require('./routes/index');

var app = express();
var api = require("./api/app");
var ws = require("./api/util/ws");
var cookieUtil = require('./api/util/cookieUtil');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(log4js.connectLogger(logger, {level: 'auto'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

/*function sha1(str) {
	var md5sum = crypto.createHash('sha1');
	md5sum.update(str, "utf8");
	str = md5sum.digest('hex');
	return str;
}*/

/*app.get('/', function(req, res) {
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
});*/

function test(req, res) {
	res.render('index', {title: '保车连'});
}

app.get('*', function(req, res) {
	if(req.hostname != "wechat.91bcl.com") {
		cookieUtil.setToken(res, {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLUQyTWlEbmtPVkFKOXVxK1JUa2Frem15U2J0dXVoMU9HN0M4Q1JKMHNoc01mWW1jcmFGS3JDZk1OYkRaRENMQlwvQnpcL2d5VlUzcUJzUU5HMWpFdGZcL3hlangwNmhOQmVVM2xOSjlxcXJNNjhwVEVVbkN0UEYwQklaQnFlRjlqellBMURvUHhvT0oiLCJpc3MiOiJwbGF5LXNpbGhvdWV0dGUiLCJleHAiOjE1Mjk0NjM3MzMsImlhdCI6MTUyNjg3MTczMywianRpIjoiZTZlZWVhZmRmNTkyN2VmYjM3MjA0MGNmMDE1YTU0ODhmMTM3OGFmZjNjNjRjN2E2YTM0NDUwMzQyNjNjMDI4NjI2YTA1OGRiYTM1MjZlNjliNmRjNzFiZjExOTY0OWVkOGU1ZjMwNzYyOTZkOTBmYzlkMTNhODUzZmUzMjMyNTE0NzI4NjQzNDY4ZTk4ZTMyMmQ4Y2FlOTUzODRlYzdhMzg2NTY2MjgwZDIwOWNhNGE3YTRlMmQxOWY4ZTdiZGJiYzFmOTU2YzE2NTIxZjc0ODJlMjY1ZDY5NTFiOWUwYWRkOTg1MzI5NzczZTAxNDhkN2ZjY2IyMGQwNjUxNzk2MSJ9.yljSVQVVUJb6mYHg2T7uNjOXGC74urYVOng5lEXw-Yc'
		});
		return test(req, res);
	}
	var tokenInfo = cookieUtil.getLocalToken(req),
		code,
		appid = "wx3e98278c327dfef2",
		redirect_uri = encodeURIComponent("https://wechat.91bcl.com" + req.originalUrl),
		scope = "snsapi_userinfo";
	if(tokenInfo) {
	  res.render('index', { title: '保车连' });
	} else {
	  code = req.query.code;
	  logger.info("获取到请求中的code:" + code);
	  if(code != null) {
	      ws.get({
	          url: "/wechat/auth?code=" + code
	      }).then(function(response) {
	          if(response.code == 0) {
		          cookieUtil.setToken(res, response.data);
	          }
	          res.render('index', { title: '保车连' });
	      })
	  } else {
	      logger.info("开始请求微信鉴权");
	      logger.info("appid：" + appid);
	      logger.info("redirect_uri：" + redirect_uri);
	      res.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "#wechat_redirect");
	  }
	}
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
