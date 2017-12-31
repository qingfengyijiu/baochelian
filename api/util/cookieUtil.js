var tokenName = '91BCL_WECHAT_TOKEN';
var jwtUtil = require('./jwtUtil');

function getLocalToken(req) {
    return req.cookies[tokenName];
}

function getTokenInfo(req) {
    var localToken = getLocalToken(req);
    return jwtUtil.decoded(localToken);
}

function verifyToken(req) {
    var localToken = req.cookies[tokenName];
    return jwtUtil.verify(localToken);
}

function getToken(req) {
    //return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLXFTSkNHVWFFdmgwVGQ3cHdwUGxzYWJXZFd2VjlKeXZkaE44akM3dUhUbk5MbW5HNGRWeWY2enRcL2F2RGVRdTg1OTZXbkQweVwvRXFsSDU0aGxmSGR1TFNGQ3lEZmZyZWhkIiwiaXNzIjoicGxheS1zaWxob3VldHRlIiwiZXhwIjoxNTE3MTE4OTg1LCJpYXQiOjE1MTQ1MjY5ODUsImp0aSI6ImFiMjUzMjI3ZTM2YTVhNWYyZWQyYTFiOWFjOTQ2ZmFjZmEyNGRlNDkwMDljNjJkYjc0MjZlNTNjZmZhZTk3NGM1Njc3MDkxMWU0N2JkZmFjMzVkNmUzNDRiYWJjYTllOTA4OTI3Njk1YzkzMWU2ZmFlMjEwZTRiNDFlNTgwMzAxYmRiOGQ2ZmE3ZTg0Y2RiOTIyY2M4ODlhZDk5Y2I0NmQ1NzM2MDIyNjg1OTlhNGExYjFlYWIwMDEzNmNlNGRiY2E3OTUxMzM4YzlhNjdlY2RkYzhjM2NiZWNlYzgyYzkwOTk1ZGIyOTczZGJhNDc4YzU2NjRkMjliMzdiMGJmNzgifQ.eBdiLsb0-PG7__IBZZoumG2kvGe6VmCgT5Mzz98wLzQ';
    var tokenInfo = getTokenInfo(req);
    return tokenInfo ? tokenInfo.token : '';
}

function setToken(res, info) {
    var token = jwtUtil.generateToken(info);
    res.cookie(tokenName, token ? token : '');
}

function clearToken(res) {
    res.cookie(tokenName, '');
}

module.exports = {
    getTokenInfo: getTokenInfo,
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    verifyToken: verifyToken,
    getLocalToken: getLocalToken
};