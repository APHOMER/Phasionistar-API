const jwt = require('jsonwebtoken');
// authenticate
const tok = 'PHASIONISTAR-API-SECRET'

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, tok);
        req.user = verified;
        next();

    } catch (error) {
        console.log(error);
        res.status.send('Invalid Token, User not Authenticated');
    }
}






