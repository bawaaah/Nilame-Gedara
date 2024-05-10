import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import router from "./routes/route.js"

const app = express()

app.use(cors());
app.use(bodyparser.json());

const mongoDbURL = "mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

mongoose.connect(mongoDbURL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

/** api routes */
app.use('/api', router)


app.listen(8070, () => console.log('Sever Connected'))