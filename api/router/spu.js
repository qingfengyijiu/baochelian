var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken;

var userId = '59b949ac6d80f5311e8900bd';

router.get('/', function(req, res) {
    ws.get({
        url: '/spus',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


module.exports = router;
