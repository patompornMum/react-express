const db = require('../Db');

exports.registerHistory = async (req, res) => {
    try {
        const year = req.params.year ?? new Date().getFullYear();

        const data = await db('users')
            .select(db.raw('MONTH(created_at) AS month'))
            .select(db.raw('COUNT(id) as total'))
            .whereRaw('YEAR(created_at) = ?', year)
            .groupByRaw('MONTH(created_at)');

        const defaultData = {};

        for (let i = 1; i <= 12; i++) {
            defaultData[i] = 0;
        }

        data.map(item => {
            defaultData[item.month] = item.total;
        })

        res.status(200).json(defaultData);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
}

exports.feedHistory = async (req, res) => {
    try {
        const year = req.params.year ?? new Date().getFullYear();

        const data = await db('feed')
            .select(db.raw('MONTH(created_at) AS month'))
            .select(db.raw('COUNT(id) as total'))
            .whereRaw('YEAR(created_at) = ?', year)
            .groupByRaw('MONTH(created_at)');

        const defaultData = {};
        
        for (let i = 1; i <= 12; i++) {
            defaultData[i] = 0;
        }

        data.map(item => {
            defaultData[item.month] = item.total;
        })

        res.status(200).json(defaultData);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
}