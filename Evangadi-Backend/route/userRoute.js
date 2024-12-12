const express = require('express');
const router = express.Router();

//authentication middleware
const authMiddleWare = require('../middleWare/authMiddleWare')

//user controllers 
const {register,login,checkUser,getAnswer} = require('../controller/userController')

//user login
router.post("/login",login)


module.exports = router