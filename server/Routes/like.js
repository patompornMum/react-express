const express = require('express');
const router = express.Router()

const { auth, adminCheck } = require('../Middleware/auth');

const { like, unlike } = require('../Controllers/like');


router.post('/like', auth, like);
router.post('/unlike', auth, unlike);

module.exports = router