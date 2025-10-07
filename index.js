const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')

const router = require('./routes');
const { checkAuth } = require('./utils/auth');

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL)
.then(res => {
    console.log("Connected to mongo")
})
.catch(err => {
    console.log("Error", err)
})

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(checkAuth)
app.use(router)

app.set('view engine', 'ejs')




app.listen(3000, () => {
    console.log('Server is listening at 3000')
})