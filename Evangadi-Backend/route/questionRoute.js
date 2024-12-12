const { default: authMiddleware } = require('../middleWare/authMiddleware')

 const route=require('express').Router()
  
 const { getAllQuestions,getSingleQuestion } = require("../controller/questionController"); // Import controller
 

 route.get("/:questionId", authMiddleware, getSingleQuestion);
 
 // Define the route for fetching all questions
 route.get("/question", getAllQuestions);
 module.exports=route;

