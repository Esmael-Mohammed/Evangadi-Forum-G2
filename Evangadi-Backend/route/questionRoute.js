
const authMiddleware = require("../middleWare/authMiddleware")
const { getAllQuestions,getSingleQuestion,postQuestion } = require("../controller/questionController"); // Import controller
// API endpoints
const route=require('express').Router()
route.post("/questions", authMiddleware, postQuestion);
 route.get("/questions/:questionId", authMiddleware, getSingleQuestion);
 // Define the route for fetching all questions
 route.get("/question",authMiddleware,getAllQuestions);
 module.exports=route;


