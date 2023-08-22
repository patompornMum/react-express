const express = require('express')
const app = express()
const env = require('dotenv').config();
const port = process.env.PORT || 3000;
const morgan = require('morgan')
const cors = require('cors')

//use morgan
// app.use(morgan('dev'))
//use cors *
app.use(cors())
//express.json => get data body type json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup init socket.io
const { createServer } = require('http');
const initializeSocket = require('./socket');
const httpServer = createServer(app);
const io = initializeSocket(httpServer);
//close init socket.io

//set route public
app.use('/public', express.static('public'))

// //route
// const initailRoute = require('./src/route');
// app.use(initailRoute);

const { readdirSync } = require('fs');


app.get('/', async (req, res) => {
    // res.send('Hello world')
    res.json({ data: 'Hello Server' });
});

readdirSync('./Routes')
    .map((fileName) => app.use('/api', require('./Routes/' + fileName)));

httpServer.listen(port, () => {
    console.log(`Start app listening on port ${port} ${new Date().toLocaleTimeString()}`)
})