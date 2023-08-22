
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET_KEY;

let userOnline = {};

function initializeSocket(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token
        // console.log(token)
        if (token != 'auth token') {
            socket.disconnect(true);
            return next(new Error('Connection not allowed'));
        } else {
            next();
        }
    }).on('connection', (socket) => {
        const { userId } = socket.handshake.query;
        userOnline[userId] = (userOnline[userId] ?? 0) + 1;
        console.log(`Connect userID: ${userId}`)
        // console.log(userOnline);

        io.emit('userOnline', userOnline)

        //Disconnect
        socket.on('disconnect', () => {
            console.log(`Disconnect userID : ${userId}`);

            userOnline[userId] = (userOnline[userId] ?? 0) - 1;
            (userOnline[userId] === 0) ? delete userOnline[userId] : null;
            // console.log(userOnline)
            io.emit('userOnline', userOnline)
        })
    });

    return io;
}

module.exports = initializeSocket;