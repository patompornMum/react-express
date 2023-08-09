const db = require('../Db');

exports.like = async (req, res) => {
    try {
        const { id: user_id } = req.authData;
        const { feedId } = req.body;

        const checkLike = await db('likes').where(
            {
                user_id: user_id,
                feed_id: feedId
            }
        ).first();
        if (checkLike) {
            res.status(500).json({ status: 'error', msg: 'Like Fail' })
            return
        }


        const insertLike = await db('likes').insert(
            {
                user_id: user_id,
                feed_id: feedId
            }
        );

        const updateTotalLike = await db('feed').where(
            { id: feedId }
        ).update(
            { likes: db.raw('likes + 1') }
        );

        res.status(200).json({ status: 'success', msg: 'like success' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.unlike = async (req, res) => {
    try {
        const { id: user_id } = req.authData;
        const { feedId } = req.body;

        const deleteLike = await db('likes').del().where(
            {
                user_id: user_id,
                feed_id: feedId
            }
        );

        if (!deleteLike) {
            res.status(500).json({ status: 'error', msg: 'Unlike Fail' });
            return
        }

        const updateTotalLike = await db('feed').where(
            { id: feedId }
        ).update(
            { likes: db.raw('likes - 1') }
        );

        res.status(200).json({ status: 'success', msg: 'Unlike Success' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};