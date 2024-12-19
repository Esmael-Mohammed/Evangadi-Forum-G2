import express from 'express'
const router = express.Router();

import { postAnswer,getAnswer } from '../controller/answerController.js';
// answer route
router.post("/answer", postAnswer);
router.get("/answer/:questionId", getAnswer);

export default router;  // export the router
