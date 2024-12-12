const db = require("../db/dbconfig"); // Import the database connection

exports.getAllQuestions = async (req, res) => {
  try {
    // Query the database to fetch all questions
    const [questions] = await db.query("SELECT * FROM questions"); // Fetch data from 'questions' table

    // Send the response JSON payload
    res.status(200).json({
      success: true,
      count: questions.length, // Number of questions
      data: questions, // Array of questions
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
