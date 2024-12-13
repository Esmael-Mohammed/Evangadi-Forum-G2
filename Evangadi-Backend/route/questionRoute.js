
const authMiddleware = require("../middleWare/authMiddleware")

const { route } = require("../controller/questionController");
// API endpoints
route.post("/questions", authMiddleware, postQuestion);


 const route=require('express').Router()
  

 route.get("/:questionId", authMiddleware, getSingleQuestion);
 module.exports=route;



