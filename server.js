//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
var bodyParser = require('body-parser')
const PORT = 5000 || process.env.PORT;

const app = express();

//Connect to mongoose DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Static Route
app.use(express.static('public'));
//HTML Routes
//Excercise
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'))
})
//Stats
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'))
})

// API Router
app.use('/api', require('./routes/api'))

//Parse Post Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Initiating the Express Server
app.listen(PORT, () => console.log(`The Express server is now up and running on port ${PORT}`))