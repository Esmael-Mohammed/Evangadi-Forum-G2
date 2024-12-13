const express=  require ('express');
const router = express.Router()

const postAnswer= require('../controller/answerController')
// answer route
router.post("/answer",postAnswer)

module.exports= router;