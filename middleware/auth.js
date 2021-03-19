const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-header');

    if(!token) {
        //401 Unauthorized
        return res.status(401).send('Token not provided');
    }

    try {
        const decodedToken = jwt.verify(token, '1@3456Qw-');
        req.user = decodedToken;
        console.log(decodedToken);
        next();
    } catch(ex) {
        res.status(400).send('Bad Request');
    }
}

module.exports = auth;