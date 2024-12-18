
// API endpoints
import express from 'express';
const router=express.Router();
import {getAllQuestions,getSingleQuestion,postQuestion} from '../controller/questionController.js';
router.post("/questions",postQuestion);
 router.get("/questions/:questionId", getSingleQuestion);
 // Define the route for fetching all questions
 router.get("/question",getAllQuestions);
 export default router;


