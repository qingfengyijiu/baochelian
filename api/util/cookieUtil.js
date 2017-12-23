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
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLUpOS1F6TUtWYjZnMzlxMjBmUHNHdkEyNHRYUkM4MDlaU2pvd1lNMG1WVXlteHA0czhwSk91dE13T2xwSWJ1MTlsRUp6MVdHbXZoZ1p0d2x3QlA4NnFVcmpPQmNGUGptVyIsImlzcyI6InBsYXktc2lsaG91ZXR0ZSIsImV4cCI6MTUxNjYyMDkwNCwiaWF0IjoxNTE0MDI4OTA0LCJqdGkiOiJiMzAyMzFmMmMzMjc0MjYxOWI2NTFiZDRhZDQ3ZTYzZTg1MzBhNjg5NDVlZGMwYmVkYTYxNWY2NjlmYzdiOGFhYTBmZWU5MjAzOWJmMTUxMzJiYzQ2YzQyNjVjMDkzMGY3MjFkYmQ0MzcwYjU4MDAzZGE0MGQxMDhiOWIyMjQ2N2M1NmNlNDMzMjYwODM2NmY0NzZjNmI1Mjc2MTJhYmUwMTJkNzgyZWM1YjY5OTIyNzA3YjM5NWU3ODdhZWE3NjQzNDYyNzc3NDBiNWNiOGMzOWRjNzk4NmExYzZhOTE4NGJhZWZjYzAyNDQ2ZDQzMzMyNzI0NDI0N2M2NzE2NTI2In0.VsBX3xwsNyQx1kHJcWRbgrjQAf7VPCqQC4Mn_kbX74c';
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