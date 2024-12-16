
const authMiddleware = require("../middleWare/authMiddleware")
const { getAllQuestions,getSingleQuestion,postQuestion } = require("../controller/questionController"); // Import controller
// API endpoints
const route=require('express').Router()
route.post("/questions",postQuestion);
 route.get("/questions/:questionId", getSingleQuestion);
 // Define the route for fetching all questions
 route.get("/question",getAllQuestions);
 module.exports=route;


