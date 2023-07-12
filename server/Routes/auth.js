const express = require('express')
const router = express.Router()

const {
    register
} = require('../Controllers/auth');

router.post('/register', register);
router.get('/register',(req,res)=>{
    res.send('GET Register')
})

module.exports = router