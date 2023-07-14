const db = require('../Db');

exports.list = async (req, res) => {
    try {

        const user = await db('users').select('id','username','role');
        res.status(200).json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};