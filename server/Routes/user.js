const express = require('express')
const router = express.Router()

//http://localhost:5000/api/test1

router.get('/user/', async(req,res)=>{
	// res.send('Hello world')
    res.json({data:'Hello user'});
});


module.exports = router