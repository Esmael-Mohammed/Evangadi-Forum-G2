const bcrypt = require("bcrypt");
const dbConnection = require("../db/dbConfig");
const {statusCodes, StatusCodes} =require('http-status-codes');
const jwt = require('jsonwebtoken')





async function getAnswer(req,res){
  const {questionId} = req.body;
  if(!questionId){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"no answer for this question"})
  }

  try {
    const [user] = await dbConnection.query("questionId= ? ", [questionId])
    
    if(questionId.length == 0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"});
    }

    const questionId = user[0].questionId;
    const token = jwt.sign({questionId}, process.env.JWT_SECRET,{expiresIn:"1d"})
  
    return res.status(StatusCodes.OK).json({msg:"answe success", token, username})


  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"somthing went wrong try again later"})
  }
}

module.exports = {login,getAnswer}