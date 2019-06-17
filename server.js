const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const moment = require('moment');
// const sass = require('sass');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/memories';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});


mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...');
});

const memoriesController = require('./controllers/memories.js');
app.use('/memories', memoriesController);


const usersController = require('./controllers/users.js');
app.use('/users',usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.listen(PORT, ()=>{
    console.log('listening on', PORT);
});
