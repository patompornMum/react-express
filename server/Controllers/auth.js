const bcrypt = require('bcrypt')
const saltRounds = process.env.BCRYPT_SALT || 10;

var jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;

const db = require('../Db');

exports.register = async (req, res) => {
    try {
        var { username, password } = req.body;

        //check Username
        const checkUsername = await db('users').select('id').where({ username: username });
        if (checkUsername.length > 0) {
            res.status(401).json({ status: 'error', msg: 'This Username is already being used.' });
            return
        }

        const hashPassword = await bcrypt.hash(password, parseInt(saltRounds));

        const insertUser = await db('users').insert({ username: username, password: hashPassword });

        console.log(insertUser);
        res.status(200).json({ status: 'ok', msg: 'register success !' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        var { username, password } = req.body;

        const user = await db('users').where({ username: username }).first();

        //check Username
        if (!user) {
            res.status(401).json({ status: 'error', msg: 'usernmae not found !' });
            return
        }
        //check Password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            // const token = jwt.sign(
            //     { id: user.id, username: user.username, role: user.role },
            //     jwt_secret,
            //     { expiresIn: '30 days' }
            // );
            
            //Expire 1 Day
            const expToken = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1);
            const token = jwt.sign(
                {
                    id: user.id, username: user.username, role: user.role,
                    exp: expToken
                },
                jwt_secret
            );
            res.status(200).json({ status: 'ok', msg: 'login success !', token: token});
            // const userInfo = {
            //     id: user.id,
            //     username: user.username,
            //     role: user.role,
            //     expToken: expToken
            // }
            // res.status(200).json({ status: 'ok', msg: 'login success !', token: token, userInfo: userInfo });
        } else {
            res.status(401).json({ status: 'error', msg: 'password invalid !' });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.tokenInfo = async (req, res) => {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1];

        if (!bearerToken) {
            return res.status(401).json({ status: 'error', msg: 'Token Invalid' });
        }

        // const decoded = jwt.verify(bearerToken, jwt_secret)
        const decoded = jwt.verify(bearerToken, jwt_secret, function(err, decoded) {
            if(err){
                res.status(500).json({ status: 'error', msg: err.message ?? 'Token Error'});
                return 
            }
            return decoded
        });

        // console.log(decoded);
        return res.status(200).json(decoded);
    } catch (err) { 
        // console.log(err.message);
        console.log(err)

        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};