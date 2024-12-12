// db connection import from dbconfig folder
const dbConnection = require("../dbConfig/database.js")

const bcrypt = require('bcrypt'); // this is for used password encrybted 

const { statusCodes, StatusCodes } = require('http-status-codes')

const jwt = require('jsonwebtoken')


// user registor status
async function register(req, res) {
    const {userName, firstName, lastName, email, password} = req.body;

    if (!email || !password || !firstName ||  !lastName || !userName) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provided all required information"})
    }

    try {
        const[user]= await dbConnection.query("select username, userid from users where username = ? or email = ?", [username, email])
        // return res.json({user: user})
        if (user.length > 0) {
            return res.status(statusCodes.BAD_REQUEST).json({msg: "user already registerd"}) // This is control of user register in database
        }
        if (password.length <=8) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "password must be at least 8 characters"}) // This is check password length of characters
        }
        // encrypt the password
        const salt = await bcrypt.genSalt(10) // This retuen randum string of password
        const hashedPassword = await bcrypt.hash(password,salt) // password replaced by hashedPassword


        await dbConnection.query("INSERT INTO users (username, firstname,lastname,email,password) VALUES (?,?,?,?,?)",
                [userName, firstname, lastName, email, hashedPassword])
                return res.status(StatusCodes.CREATED).json({msg: "user register created"})
    
    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong, try again later"}) // This try catch at database server side 
    }
}

// Login user status
async function login(req, res) {
    const { email, password } = req.body; // This expected data from postman body json 

    if (!email || !password) {
        return res.status(400).json({msg: "please enter all required fields"});
    }

try {
    const [user] = await dbConnection.query("select username,userid, password from users where email = ? ", [email])
    if (user.length==0) {
        return res.status(400).json({msg: "invalid credential"})
    }
    // compare password of hashedpassword with actual password
    const isMatch = await bcrypt.compare(password, user[0].password)

    if (!isMatch) {
        return res.status(400).json({msg: "invalid credential"})
    }
        // return res.json({user: user[0].password}) // This retuen only password
        const username = user[0].userName;
        const userid = user[0].userId;
        const token = jwt.sign({username, userid}, process.env.JWT_SECRET, {expiresIn: "1d"}) // 1d is one day of expire

        return res.status(200).json({msg: "user login successful", token})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg: "something went wrong, try again later"});
    }
}




// User check status
async function checkUser(req, res) {
    const username = req.user.userName
    const userid = req.user.userId

    res.status(200).json({msg: "valid user", username, userid})

}

module.exports = {register, login, checkUser} // Those are controllers 