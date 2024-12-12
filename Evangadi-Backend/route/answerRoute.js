const express = require('express');
const router = express.Router();

// Authentication middleware to ensure only authenticated users can access the route
const authMiddleWare = require('../middleWare/authMiddleWare')

// Route to fetch all questions, protected by authentication middleware
router.get("/all-answers", authMiddleWare, (req, res) => {

  // Send a response with a simple message 
  res.send("all answers")
})




module.exports = router;

