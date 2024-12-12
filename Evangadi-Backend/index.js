require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
app.use(cors());
const UserRoutes = require("./ruotes/userRoute"); /////////////////
app.use(express.json());

//user routes middleware
app.use("/api/users", UserRoutes);
