const bcrypt = require("bcrypt");
const dbConnection = require("../db/dbConfig");
const {statusCodes, StatusCodes} =require('http-status-codes');
const jwt = require('jsonwebtoken')



async function login(req,res){
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill all required parts"})
  }

  try {
    const [user] = await dbConnection.query("select username,userid,password from users where email = ? ", [email])
    
    if(user.length == 0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"});
    }
    //compare password
    const isMatch = await bcrypt.compare(password,user[0].password)
    if(!isMatch){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
    }

    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({username,userid}, process.env.JWT_SECRET,{expiresIn:"1d"})
  
    return res.status(StatusCodes.OK).json({msg:"user login successfully", token, username})


  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"somthing went wrong try again later"})
  }
}


module.exports = {login,getAnswer}