const authMiddleware = require("../middleWare/authMiddleware")

const { route } = require("../controller/questionController");
// API endpoints
route.post("/questions", authMiddleware, postQuestion);