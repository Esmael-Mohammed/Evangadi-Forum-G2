// Import required modules
const express = require('express');
const router = express.Router();
const { checkUser } = require('../middleWare/authMiddleware');

// Mock database or data access layer
const answersDB = [];
const questionsDB = [];

// POST /api/answer - Submit an answer for a specific question
router.post('/answer', checkUser, (req, res) => {
    const { questionid, answer } = req.body;

    // Validate request body
    if (!questionid || typeof questionid !== 'number') {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid or missing question ID',
        });
    }

    if (!answer || typeof answer !== 'string' || !answer.trim()) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Please provide answer',
        });
    }

    try {
        // Mock storing the answer (you can replace this with actual DB logic)
        const newAnswer = {
            answer_id: answersDB.length + 1,
            question_id: questionid,
            content: answer.trim(),
            user_name: req.user.username,
            created_at: new Date().toISOString(),
        };

        answersDB.push(newAnswer);

        // Respond with success
        res.status(201).json({
            message: 'Answer posted successfully',
        });
    } catch (error) {
        console.error('Error posting answer:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred.',
        });
    }
});

// POST /api/question - Create a new question
router.post('/question', checkUser, (req, res) => {
    const { title, description } = req.body;

    // Validate request body
    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Title is required and must be a non-empty string',
        });
    }

    if (!description || typeof description !== 'string' || !description.trim()) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Description is required and must be a non-empty string',
        });
    }

    try {
        // Mock storing the question (you can replace this with actual DB logic)
        const newQuestion = {
            question_id: questionsDB.length + 1,
            title: title.trim(),
            description: description.trim(),
            user_name: req.user.username,
            created_at: new Date().toISOString(),
        };

        questionsDB.push(newQuestion);

        // Respond with success
        res.status(201).json({
            message: 'Question created successfully',
        });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred.',
        });
    }
});

module.exports = router;
