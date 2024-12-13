
async function postQuestion(req, res) {
    const { title, description } = req.body;
  
    // Check for missing items
    if (!title || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Please provide all required fields!",
      });
  }

try {
  // get userid from user
  const { userId } = req.user;

  // get a unique identifier for questionid so two questions do not end up having the same id. crypto built in node module.
  const questionId = crypto.randomBytes(16).toString("hex");

  const tag = generateTag(title);

  // Insert question into database
  await dbConnection.query(
    "INSERT INTO questions ( userId, questionId, title, description, tag, created_at) VALUES (?,?,?,?,?,?)",
    [userId, questionId, title, description, tag, new Date()]
  );

  return res.status(StatusCodes.CREATED).json({
    meg: "Question created successfully",
  });
  
} catch (error) {
  console.log(error.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "An unexpected error occurred.",
    });
  }
}