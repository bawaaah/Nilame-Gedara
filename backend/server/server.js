const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors());
app.use(bodyparser.json());

const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

mongoose.connect(mongoDbURL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

const paymentRouter = require("../routes/payments.js");
const paymentController = require('../routes/paymentController.js');
const discountRouter = require('../routes/discount.js')
app.use('/auth', paymentController);

app.use("/discount",discountRouter);
app.use("/payment",paymentRouter);

app.listen(8070, () => console.log('Sever Connected'))