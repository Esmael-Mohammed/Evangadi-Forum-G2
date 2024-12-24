const express = require("express");
const router = express.Router();

const { postAnswer, getAnswer } = require("../controller/answerController");
// answer route
router.post("/answer", postAnswer);
router.get("/answer/:questionId", getAnswer);
router.delete("/answers/:questionId/:userId", deleteAnswerByUser);

module.exports = router;
