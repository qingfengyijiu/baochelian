var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 获取jsapi signature
 */
router.post('/coupons/custom', function(req, res) {
	ws.get({
		url: '/web/user/coupons/custom',
		token: getToken(req),
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

module.exports = router;
