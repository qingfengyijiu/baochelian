var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 轮播图列表查询
 */
router.get('/', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/slideImgs',
        token: token,
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图新增
 */
router.post('/', function(req, res) {
    var token = getToken(req);
    ws.post({
        url: '/slideImgs',
        token: token,
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图id查询
 */
router.get('/:id', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/slideImgs/' + id,
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图修改
 */
router.post('/:id', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.post({
        url: '/slideImgs/' + id,
        data: req.body,
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图删除
 */
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    ws.delete({
        url: '/slideImgs/' + id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图恢复
 */
router.post('/:id/recovery', function(req, res) {
    var id = req.params.id;
    ws.delete({
        url: '/slideImgs/' + id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图上线
 */
router.post('/:id/up', function(req, res) {
    ws.get({
        url: '/slideImgs/status/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 轮播图下线
 */
router.post('/:id/down', function(req, res) {
    ws.get({
        url: '/slideImgs/status/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/games/' + id,
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/games_delete/' + id,
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/:id/recovery', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/game_recovery/' + id,
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/:id/up', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/games_up/:id',
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/:id/down', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/games_down/:id',
        token: token
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
