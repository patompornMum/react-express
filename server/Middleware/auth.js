const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.auth = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1];

        if (!bearerToken) {
            return res.status(401).json({ status: 'error', msg: 'Token Invalid' });
        }

        const decoded = jwt.verify(bearerToken, jwt_secret)
        req.authData = decoded;
        next();

    } catch (err) {
        // console.log(err.message)
        res.status(500).json({ status: 'error', msg: 'Token Invalid' });
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        const { role } = req.authData;
        // console.log(role)

        if(role !== 'admin'){
            return res.status(403).json({ status: 'error', msg: 'Access Denied!' });
        }
        next();

    } catch (err) {
        res.status(403).json({ status: 'error', msg: 'Access Denied!' });
    }
}