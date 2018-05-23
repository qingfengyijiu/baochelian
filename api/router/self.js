var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken;
var moment = require("moment");

router.get('/truck', function(req, res) {
    ws.get({
        url: '/web/trucks',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.put('/truck', function(req, res) {
    ws.put({
        url: '/web/trucks',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.get('/account', function(req, res) {
    ws.get({
        url: '/web/accounts',
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.get('/info', function(req, res) {
    ws.get({
        url: '/users/self',
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.get('/coupons', function(req, res) {
    ws.get({
        url: '/web/user/coupons',
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.post('/bindPhone', function(req, res) {
    ws.post({
        url: '/web/bind/phone',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

router.post('/draw', function(req, res) {
	ws.post({
		url: '/web/bind/phone',
		token: getToken(req),
		data: {
		    phone: req.body.phone,
            captcha: "leopard" + new moment().format("YYYYMMDD")
        }
	}).then(function(response) {
		ws.handleResponse(response, res);
	});
})

router.get('/qrcode', function(req, res) {
    ws.get({
        url: '/web/qrcode',
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
})

module.exports = router;
