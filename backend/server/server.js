const express = require('express')
const mongoose = require('mongoose')
const incidentRouter = require("../route/incident.route")

const app = express()

const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json())


app.use('/incidents', incidentRouter);





const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

mongoose.connect(mongoDbURL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

app.listen(3000, () => console.log('Sever Connected'))


