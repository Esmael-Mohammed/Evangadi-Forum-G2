const express = require("express");
const router = express.Router();
//authonthication middleware
const authMiddleware = require("../middleWare/authMiddleware");

//user controllers
const { register, login, checkUser } = require("../controller/userController");

router.post("/login", login);
