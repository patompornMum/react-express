const express = require('express');
const router = express.Router()

const { auth, adminCheck } = require('../Middleware/auth');
const { list } = require('../Controllers/user');

//http://localhost:5000/api/test1

router.get('/user', async(req,res)=>{
	// res.send('Hello world')
    res.json({data:'Hello user'});
});

router.post('/user', auth, adminCheck, list);


module.exports = router