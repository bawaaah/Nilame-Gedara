const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bhawan:200132400588@atlascluster.fl5bp73.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
.then(() => console.log('Connected'))
.catch((err) => console.log(err))