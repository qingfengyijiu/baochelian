var tokenName = '91BCL_WECHAT_TOKEN';
var jwtUtil = require('./jwtUtil');

function getLocalToken(req) {
    return req.cookies[tokenName];
}

function setLocalToken(res, token) {
    return res.cookie(tokenName, token ? token : '');
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
    getLocalToken: getLocalToken,
    setLocalToken: setLocalToken
};