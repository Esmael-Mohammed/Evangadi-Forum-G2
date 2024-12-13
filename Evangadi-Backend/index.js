
const express= require ('express');
const app= express();
const dbConnection=require('./db/dbconfig')

const answerRouter=require('./route/answerRoute')
const  questionRouter  = require("./route/questionRoute");
const userRouter = require('./route/userRoute')

app.use("api/answer",answerRouter)


//user routes middleware
app.use("/api/user", userRouter);
//question routes middleware
app.use("/api", authMiddleware, questionRouter);
//answer routes middleware
app.use("/api", authMiddleware, answerRouter);
//using get http method (to request data from server)
app.get("/", (req, res) => {
  res.send("API Working");
});
//new method of server starter with db connection
const startConnection = async () => {
  try {
    const result = await dbConnection.execute("select 'test'");
    console.log(result);
    await app.listen(port);
    console.log("database connected");
    console.log(`server running on {http://localhost}:${port}`);
  } catch (error) {
    console.log(error.message);
  }
};
startConnection();
