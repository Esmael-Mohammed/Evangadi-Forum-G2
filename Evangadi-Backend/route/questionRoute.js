const express = require("express");
const router = express.Router();
const { getAllQuestions } = require("../controller/questionController"); // Import controller

// Define the route for fetching all questions
router.get("/question", getAllQuestions);

module.exports = router;
