var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
	getToken = cookieUtil.getToken;

router.get('/brands', function(req, res) {
	ws.get({
		url: '/truck_brands?',
		qs: req.query,
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/truck', function(req, res) {
	ws.get({
		url: '/web/trucks',
		token: getToken(req),
		qs: req.query
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/account', function(req, res) {
	ws.get({
		url: '/web/accounts',
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/info', function(req, res) {
	ws.get({
		url: '/users/self',
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	});
});

module.exports = router;
