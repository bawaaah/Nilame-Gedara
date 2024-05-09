const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

mongoose.connect(mongoDbURL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

app.listen(PORT, () => console.log('Sever Connected'))

const employeeRouter = require("../routes/employees.js");

app.use("/employee",employeeRouter);