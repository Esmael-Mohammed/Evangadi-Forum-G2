const express = require("express");
const router = express.Router();

//authonthication middleware
const authMiddleware = require("../middleWare/authMiddleware");

// user controllers
const { register, login, checkUser } = require("../controller/userController");
// register route
router.post("/register", register);
//http://localhost:3003/api/user/check
// login user
router.post("/login", login);

// check user
router.get("/check",authMiddleware,checkUser);
//logout 
router.delete('/logout',logOut);



//user controllers

module.exports = router;
