var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
	getToken = cookieUtil.getToken;

router.get('/', function(req, res) {
	ws.get({
		url: '/web/service_categories/info',
		token: getToken(req),
		qs: req.query
	}).then(function(response) {
		ws.handleResponse(response, res);
	});
});

module.exports = router;
