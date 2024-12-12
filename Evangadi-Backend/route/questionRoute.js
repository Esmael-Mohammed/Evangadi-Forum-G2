const { default: authMiddleware } = require('../middleWare/authMiddleware')

 const route=require('express').Router()
  

 route.get("/:questionId", authMiddleware, getSingleQuestion);
 module.exports=route;


