var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 获取jsapi signature
 */
router.get('/jsapi_signature', function(req, res) {
	ws.get({
		url: '/wechat/jsapi_signature',
		qs: {
			timestamp: req.query.timestamp,
			noncestr: req.query.nonceStr,
			url: req.query.url
		}
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

module.exports = router;
