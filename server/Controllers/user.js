const db = require('../Db');

exports.list = async (req, res) => {
    try {

        const user = await db('users').select('id', 'username', 'role', 'status');
        res.status(200).json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;

        let { status } = req.body;
        status = (status == 'enable') ? 'enable' : 'disable';

        await db('users').where(
            { id: id }
        ).update(
            { status: status }
        );
        res.status(200).json({ status: 'success', msg: 'update success' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.changeRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { role } = req.body;

        await db('users').where(
            { id: id }
        ).update(
            { role: role }
        );
        res.status(200).json({ status: 'success', msg: 'update success' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        await db('users').del().where('id', id);
        res.status(200).json({ status: 'success', msg: 'delete success' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};