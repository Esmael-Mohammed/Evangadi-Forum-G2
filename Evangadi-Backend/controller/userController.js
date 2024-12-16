
// db Connection
const dbConnection = require('../db/dbconfig');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName || !userName) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide all required fields!" });//404
  }
try {
  const [user] = await dbConnection.query("select userName,userId from users where userName =? or email =? ", [userName,email])
  if (user.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "user already existed" });
  }
if(password.length<=8){
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "password must be at least 8 characters" });
  }
// encrypt the password//123456789
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

await dbConnection.query("INSERT INTO users (userName, firstName, lastName,email,password) VALUES (?,?,?,?,?) ",[userName,firstName,lastName,email,hashedPassword])
return res.status(StatusCodes.CREATED).json({ msg: "user register" });
} catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields!" });
  }
  try {
    const [user] = await dbConnection.query(
      "select userName,userId,password from users where email=?",
      [email]
    );
    
    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential!" });
    }
    //compare password 
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    const userName = user[0].userName;
    const userId = user[0].userId;
    const token = jwt.sign({ userName, userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successfull" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}
async function checkUser(req, res) {
  const userName = req.user.userName;
  const userId = req.user.userId;
  res.status(StatusCodes.OK).json({ msg: "valid user", userName, userId });
}
async function logOut(req,res) {
  return res.status(StatusCodes.OK).json({msg:"successfuly logout"})
  
}

module.exports = { register, login, checkUser };
