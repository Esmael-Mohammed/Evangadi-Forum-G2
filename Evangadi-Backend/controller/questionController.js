//! Endpoint Implementation:
// Load the Express framework to handle HTTP requests and responses.
const express = require("express");
// Initialize App
const app = express();
const dbConnection=require('../db/dbconfig');


async function getSingleQuestion(req, res) {
  const { questionId } = req.params;
  console.log(questionId);
  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid question ID" });
  }
  try {
    // Query the database to get the question details
    const [question] = await dbConnection.execute(
      "SELECT * FROM questions WHERE questionId = ?",
      [questionId])
    
    //  If no question found, return 404
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }
    // Return the question details
    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred" });
  }
}

module.exports = getSingleQuestion;

