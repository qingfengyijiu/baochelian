var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken;

var userId = '59b949ac6d80f5311e8900bd';

router.get('/', function(req, res) {
    ws.get({
        url: '/web/user/' + userId + '/orders',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/', function(req, res) {
	ws.post({
		url: '/web/user/' + userId + '/order',
		token: getToken(req),
		data: req.body
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/:id/pay', function(req, res) {
    ws.get({
        url: '/web/user/' + userId + '/order/' + req.params.id + '/payment/prepayId',
	    token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/:id/scoring', function(req, res) {
	ws.post({
		url: '/web/user/' + userId + '/order/' + req.params.id + '/scoring',
        data: req.body
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/:id', function(req, res) {
    ws.get({
        url: '/web/user/' + userId + '/order/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
