var tokenName = 'msToken';
var jwtUtil = require('./jwtUtil');

function getTokenInfo(req) {
    var localToken = req.cookies[tokenName];
    return jwtUtil.decoded(localToken);
}

function verifyToken(req) {
    var localToken = req.cookies[tokenName];
    return jwtUtil.verify(localToken);
}

function getToken(req) {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLVRvZVR3Z2o5VHdWM2hKK2UzcDNLQ1Iya09QaURGV2NvcXczQmMwcjdlQUdmTEQzOWJRSzhiekVjXC9wR2FkeExtN0lraDJsNjBSbmlEeGh5VjQrUGlKU1E1XC9uK1ZrY2s0IiwiaXNzIjoicGxheS1zaWxob3VldHRlIiwiZXhwIjoxNTE1MDQ3NDEzLCJpYXQiOjE1MTI0NTU0MTMsImp0aSI6Ijc3YmZiNjBkNWYxMjE1OTM4MDE5ZjRiMzQ4NzAzZDM3NDcxOGJhNjEzOWU0ZWU5NTlmODQ2NDMxNjlmOGIwYThjNzBkNzhiNTkxZTllYjU0YjRmMzgwNzc5ZGVhNzkzYjIwYjI5NWZmNWRkMDgyZTJiNGZhN2NlYWZlNGU4NWM2NWY4NWQyZmEwODgxZTRlZTAwNzBhZjY2YzA2N2NiMTgzZWNiODNmYjdhZDhmOWY2ZTU2ZmUwYTFjMGZjZjBiMmViMGM5YzE4ODdmMDkyYTU4Y2FlNTQ5ZGFiOGFiMTM0ZTk0MDYxMzBmYTFkNWE4MTJkYjE3ZGExZWFmYzIwYTcifQ.7uAeUUJI_NDLyh_u0lL1Ly7roovyp94Mgc-ioC5-FGI';
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
    getTokenInfo,
    getToken,
    setToken,
    clearToken,
    verifyToken
};