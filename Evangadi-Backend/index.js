require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port =process.env.PORT;

const app = express();
app.use(cors())

const dbConnection = require('./db/dbconfig.js')

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));






