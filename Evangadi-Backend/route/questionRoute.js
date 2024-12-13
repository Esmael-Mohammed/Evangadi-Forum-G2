const dbConnection = require("../db/dbConfig");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const submitQuestion = async (req, res) => {
  try {
    const { title, desc, userid } = req.body;

    if (!title || !desc || !userid) {
      return res.status(400).json({ message: "Title, description, and user ID are required" });
    }

    const questionid = uuidv4();
    
    const [newQuestion] = await dbConnection.query(
      "INSERT INTO questions (title, description, questionid, userid) VALUES (?, ?, ?, ?)",
      [title, desc, questionid, userid]
    );

    res.status(201).json({
      message: "Question created successfully",
      questionid,
      title,
      description: desc,
      userid,
    });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ error: "Server error while submitting question." });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const sql = `
      SELECT users.userid, users.username, questions.title, questions.questionid, questions.description
      FROM users
      JOIN questions ON users.userid = questions.userid;
    `;

    const [result] = await dbConnection.query(sql);

    if (result.length === 0) {
      return res.status(404).json({ message: "No questions found." });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Server error while fetching questions." });
  }
};

const getSingleQuestion = async (req, res) => {
  try {
    const { questionid } = req.params;

    const sql = `
      SELECT users.username, questions.title, questions.questionid, questions.description
      FROM users
      JOIN questions ON users.userid = questions.userid
      WHERE questions.questionid = ?;
    `;

    const [result] = await dbConnection.query(sql, [questionid]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Server error while fetching question." });
  }
};

router.post("/askquestion", submitQuestion);
router.get("/getallquestions", getAllQuestions);
router.get("/questions/:questionid", getSingleQuestion);

module.exports = router;
