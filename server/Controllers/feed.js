const db = require('../Db');
const fs = require('fs');

exports.list = async (req, res) => {
    try {
        const feed = await db('feed')
            .select('feed.*', 'users.username as created_by')
            .join('users', 'feed.user_id', '=', 'users.id')
            .orderBy('feed.id', 'desc')

        res.status(200).json(feed);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const feed = await db('feed').select().where({ id: id }).first();

        if (!feed) {
            res.status(404).json({ status: 'error', msg: 'Feed not found !' });
            return
        }

        res.status(200).json(feed);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.create = async (req, res) => {
    try {
        const { id: user_id } = req.authData;
        const { title, content } = req.body;
        const file = req.file?.filename ?? null;

        const insertFeed = await db('feed').insert(
            {
                user_id: user_id,
                title: title,
                content: content,
                file: file
            }
        );

        res.status(200).json({ status: 'success', msg: 'create success' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        let newData = req.body;
        const newFile = req.file?.filename ?? null;

        var dataUpdate = {
            title: newData.title ?? null,
            content: newData.content ?? null,
        };

        if (newFile) {
            const feed = await db('feed').select('file').where({ id: id }).first();
            if (feed.file) {
                await fs.unlink('./public/uploads/' + feed.file, (err) => {
                    if (err) { console.log(err) }
                })
            }
            dataUpdate.file = newFile;
        }

        const update = await db('feed').where({ id: id }).update(dataUpdate);
        if (!update) {
            res.status(500).json({ status: 'error', msg: 'Update Fails' });
            return
        }

        res.status(200).json({ status: 'success', msg: 'Update Success !' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

exports.deleteFeed = async (req, res) => {
    try {
        const id = req.params.id;

        const feed = await db('feed').select().where({ id: id }).first();
        //check Feed
        if (!feed) {
            res.status(404).json({ status: 'error', msg: 'Feed not found !' });
            return
        }

        //remove file
        if (feed.file) {
            await fs.unlink('./public/uploads/' + feed.file, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Remove success')
                }
            })
        }

        //delete DB
        const deleted = await db('feed').del().where('id', id);

        res.status(200).json({ status: 'success', msg: 'delete success' });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};