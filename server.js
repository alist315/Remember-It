const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const moment = require('moment');
// const sass = require('sass');

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
mongoose.connect('mongodb://localhost:27017/memories', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...');
});

const memoriesController = require('./controllers/memories.js');
app.use('/memories', memoriesController);


const usersController = require('./controllers/users.js');
app.use('/users',usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.listen(port, ()=>{
    console.log('listening...');
});
