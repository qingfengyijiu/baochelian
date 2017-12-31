var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken;

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
        url: '/web/account',
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

module.exports = router;
