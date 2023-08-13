const express = require('express');
const router = express.Router()

const { auth, adminCheck } = require('../Middleware/auth');
const { list, deleteUser, changeStatus } = require('../Controllers/user');

//http://localhost:5000/api/test1

// router.get('/user', async(req,res)=>{
//     res.json({data:'Hello user'});
// });

router.get('/user', auth, adminCheck, list);
router.put('/user/changeStatus/:id', auth, adminCheck, changeStatus);
router.delete('/user/:id', auth, adminCheck, deleteUser);

module.exports = router