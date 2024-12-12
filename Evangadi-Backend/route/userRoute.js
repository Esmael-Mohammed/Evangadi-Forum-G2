const express = require("express");
const router = express.Router();
//authonthication middleware
const authMiddleware = require("../middleWare/authMiddleware");

//user controllers
const { register, login, checkUser } = require("../controller/userController");
router.post("/register", register);
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);
module.exports = router;
