const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const incidentRouter = require('./route/incident.route');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://2002RMnn:2002RMnn@cluster0.nm8hdps.mongodb.net/incidentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Add event listener for successful MongoDB connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/incidents', incidentRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});