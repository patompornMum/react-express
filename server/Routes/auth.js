const express = require('express')
const router = express.Router()

const {
    register, 
    login,
    tokenInfo
} = require('../Controllers/auth');


router.get('/register',(req,res)=>{
    res.send('GET Register')
})

router.post('/register', register);

router.post('/login', login);

router.post('/tokenInfo', tokenInfo);

module.exports = router