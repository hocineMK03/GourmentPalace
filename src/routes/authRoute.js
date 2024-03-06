const express = require('express');
const router = express.Router();
const authc=require('../controllers/authController');

router.get('/checkperms',authc.handleAccess)
router.post('/login',authc.handleLogin)
router.post('/register',authc.handleRegister)
router.get('/logout',authc.handleLogOut)
router.get('/test',(req,res)=>{
res.cookie('te','te')
res.send("test")
})
module.exports=router



