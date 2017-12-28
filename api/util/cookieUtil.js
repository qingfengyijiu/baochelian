var tokenName = '91BCL_WECHAT_TOKEN';
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
    //return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLXVlbGtLRDBuOFdKZThOb1dyWFp4a0g2MFRSM2sxQzJqNGNKNFlcL2FGY0FTZjVtd1lhNzJaMnR5VjZpRU5DR2RKRkFPSjBKWitXQTRjUGJLUFwveEFvdFAxTVFhdDlZM0YzIiwiaXNzIjoicGxheS1zaWxob3VldHRlIiwiZXhwIjoxNTE2OTgxNzg2LCJpYXQiOjE1MTQzODk3ODYsImp0aSI6ImE4MDUyZWI1YTEyNDY1MWQwZGY3YzhkZTlmMGE5MDVmOGE4ZDc4ZmZiZjA2NWJmZTZiMGRjMjZiMjgxNDU3ODQxZmJlYmFjMTk3MzZiYjFlZTNjYjZjMTQ0MGU5MmUxMWY2MWE5NTYxYWQ4NWMwMzZjNjAzY2QzMzNhOWUyZjFjNjhjMWZiYzViNWU3ZDcxMDQzOTY4OWIyY2UwMDVmNWRjM2Y2MTcwNjIyY2EwYmVkNTRmZGRjYzdjZjBjOTQyYmYyNmMwNTc3MDM0YmFlMDBiZjkwM2Q1NzQ1MzA4NzE5MjI2NjQxMTNkMDA0OGNkOTJiZTkyODdiOWQyY2QxOTAifQ.9Gz6p8L1kzh1QU9a_cfsAvR7PbrX1oDW0vSEKgjxMNU';
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