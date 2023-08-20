const express = require('express');
const router = express.Router()

const { auth, adminCheck } = require('../Middleware/auth');
const { upload } = require('../Middleware/upload');

const { list, read, create, update, deleteFeed } = require('../Controllers/feed');


router.get('/feed', auth, list);
router.get('/feed/:id', auth, read);
router.post('/feed', auth, upload, create);
router.put('/feed/:id', auth, upload, update);
router.delete('/feed/:id', auth, deleteFeed);

module.exports = router