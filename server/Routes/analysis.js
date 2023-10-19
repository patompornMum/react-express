const express = require('express');
const router = express.Router()

const { auth, adminCheck } = require('../Middleware/auth');
const { registerHistory, feedHistory } = require('../Controllers/analysis');

//http://localhost:5000/api/test1

// router.get('/user', async(req,res)=>{
//     res.json({data:'Hello user'});
// });


router.get('/analysis/registerHistory/:year?', auth, adminCheck, registerHistory);
router.get('/analysis/feedHistory/:year?', auth, adminCheck, feedHistory);

module.exports = router