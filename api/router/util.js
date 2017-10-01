var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 获取验证码
 */
router.get('/captcha', function(req, res) {
	ws.get({
		url: '/captcha',
		qs: req.query
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

/**
 * 渠道简易列表查询所有
 */
router.get('/all', function(req, res) {
	ws.get({
		url: '/channels/all',
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
})

/**
 * 渠道新增
 */
router.post('/', function(req, res) {
	var token = getToken(req);
	ws.post({
		url: '/channels',
		token: getToken(req),
		data: req.body
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

/**
 * 渠道修改
 */
router.post('/:id', function(req, res) {
	ws.post({
		url: '/channels/' + req.params.id,
		data: req.body,
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

/**
 * 渠道id查询
 */
router.get('/:id', function(req, res) {
	ws.get({
		url: '/channels/' + req.params.id,
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

/**
 * 渠道删除
 */
router.delete('/:id', function(req, res) {
	ws.delete({
		url: '/channels/' + req.params.id,
		token: getToken(req)
	}).then(function(response) {
		ws.handleResponse(response, res);
	})
});

module.exports = router;
