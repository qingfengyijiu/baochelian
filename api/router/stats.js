var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 游戏交易数据查询
 */
router.get('/trade', function(req, res) {
    ws.get({
        url: '/trades',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 按时段统计
 */
router.get('/trade/listByHour', function(req, res) {
    ws.get({
        url: '/stats/listByHour',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 按游戏统计
 */
router.get('/trade/listByGame', function(req, res) {
    ws.get({
        url: '/stats/list',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 游戏数据统计
 */
router.get('/game', function(req, res) {
    ws.get({
        url: '/stats/listByUser',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 游戏留存统计
 */
router.get('/gameReserved', function(req, res) {
    ws.get({
        url: '/stats/listByRemain',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 平台数据统计
 */
router.get('/platform', function(req, res) {
    ws.get({
        url: '/stats/listByPlatform',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 平台留存统计
 */
router.get('/platformReserved', function(req, res) {
    ws.get({
        url: '/stats/listByPlatformRemain',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
