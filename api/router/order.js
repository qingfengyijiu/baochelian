var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken;

router.get('/', function(req, res) {
    ws.get({
        url: '/web/orders',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/', function(req, res) {
	ws.post({
		url: '/web/orders',
		token: getToken(req),
		data: req.body
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/:id/pay', function(req, res) {
    ws.get({
        url: '/web/orders/' + req.params.id + '/payment/prepayId',
	    token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/:id/cancelPay', function(req, res) {
	ws.post({
		url: '/pay/wechat/cancel',
		data: {
			orderId: req.params.id
		},
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	});
});

router.post('/:id/scoring', function(req, res) {
	ws.post({
		url: '/web/orders/' + req.params.id + '/scoring',
        data: req.body,
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.post('/:id/cancel', function(req, res) {
	ws.post({
		url: '/web/orders/cancel',
		token: getToken(req),
		data: {
			orderId: req.params.id
		}
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

router.get('/:id', function(req, res) {
    ws.get({
        url: '/web/orders/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
