const bcrypt = require('bcrypt')
const saltRounds = process.env.BCRYPT_SALT || 10;

const db = require('../Db');

exports.register = async (req, res) => {
    try {
        var { username, password } = req.body;
        
        //check Username
        checkUsername = await db('users').select('id').where({ username: username });
        if (checkUsername.length > 0) {
            res.status(401).json({ status: 'error', msg: 'This Username is already being used.' });
            return
        }

        const hashPassword = await bcrypt.hash(password, parseInt(saltRounds));

        const insertUser = await db('users').insert({ username: username, password: hashPassword});

        console.log(insertUser);
        res.status(200).json({ status: 'ok', msg: 'register success !' });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', msg: error.message });
    }
};
