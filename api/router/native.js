var express = require('express');
var router = express.Router();
var ws = require('../util/ws');


router.post('/order', function(req, res) {

	var userId = req.body.userId,
		orderId = req.body.orderId,
		token = req.body.token;
	ws.get({
		url: '/mobile/user/' + userId + '/order/' + orderId,
		token: token,
		qs: req.query
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

module.exports = router;