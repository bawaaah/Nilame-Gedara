const express = require('express')
const mongoose = require('mongoose')
const itemRoute = require("./routes/item")

const app = express()

const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));  // Set limit to 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/catalog",itemRoute)

const selectProductRoute = require("./routes/selectProduct")
app.use("/selectProductRouter",selectProductRoute)

const item = require("./routes/item")
app.use("/add",item)

const order = require('./routes/order')
app.use("/order",order)

const checkout = require('./routes/checkout')
app.use("/checkout",checkout)

const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

mongoose.connect(mongoDbURL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

app.listen(8070, () => console.log('Sever Connected'))


