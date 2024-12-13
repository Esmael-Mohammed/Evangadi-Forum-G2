const dbConnection=require('../db/dbconfig')
const {statusCodes, StatusCodes} =require ('http-status-codes')
async function postAnswer(req,res){
    // res.send("answer")
    const {questionid,answer}=req.body;
    // no need to check question id becouse it will be avaliable with the question so we
    // will check only answer
    if(!answer) {
     return res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide answer"})
    }
    try {        
   await dbConnection.query("INSERT INTO ANSWERS(questionid,answer,userid) VALUES(?,?,?)", [questionid,answer,req.user.userid])
              
        return res.status(StatusCodes.CREATED).json({msg:"Answer posted successfully"})
    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "An unexpected error occurred."})
    }
}

module.exports ={postAnswer}