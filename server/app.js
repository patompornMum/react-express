const express = require('express')
const app = express()
const env = require('dotenv').config();
const port = process.env.PORT || 3000;
const morgan = require('morgan')
const cors = require('cors')

// const bcrypt = require('bcrypt')
// const saltRounds = process.env.BCRYPT_SALT || 10;

// var jwt = require('jsonwebtoken');
// const jwt_secret = process.env.JWT_SECRET_KEY;

//use morgan
app.use(morgan('dev'))
//use cors *
app.use(cors())
//express.json => get data body type json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //route
// const initailRoute = require('./src/route');
// app.use(initailRoute);

const { readdirSync } = require('fs');


app.get('/', async (req, res) => {
    // res.send('Hello world')
    res.json({ data: 'Hello world' });
});

readdirSync('./Routes')
    .map((fileName) => app.use('/api', require('./Routes/' + fileName)));



app.listen(port, () => {
    console.log(`Example app listening on port ${port} ${new Date().toLocaleTimeString()}`)
})