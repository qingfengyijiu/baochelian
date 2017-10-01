var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken;

router.get('/web', function(req, res) {
    ws.get({
        url: '/users/web',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/op', function(req, res) {
    ws.get({
        url: '/users/op',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/cp', function(req, res) {
    ws.get({
        url: '/users/cp',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/add', function(req, res) {
    var data = req.body;
    var type = Number(data.type);
    var url;

    switch (type) {
        case 5:
            url = '/signUp/op';
            break;
        case 6:
            url = '/signUp/cp';
            break;
        default:
            url = '/signUp/web';
    }
    ws.post({
        url: url,
        data: data
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
