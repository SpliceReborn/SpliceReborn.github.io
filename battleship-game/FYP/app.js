const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require ('cors');
const passport = require('passport');

// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(express.urlencoded({
    extended: false
}));
// JSON Body Middleware
app.use(express.json());
// Cors Middleware
app.use(cors());
// Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));
// passport Middleware
app.use(passport.initialize());
// Bring in Passport Strategy
require('./config/passport')(passport)


// Bring in the database config
const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(() => {
    console.log(`Database connected successfully: ${db}`)
}).catch(err => {
    console.log(`Unable to connect: ${err}`)
}); 


const users = require('./routes/api/users');
const games = require('./routes/api/games')
app.use('/api/users', users);
app.use('/api/games', games);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})