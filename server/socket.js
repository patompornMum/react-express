
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET_KEY;

let userOnline = {};
let io = null;

function initializeSocket(httpServer) {

    io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token

            const decoded = jwt.verify(token, jwt_secret)

            next();
        } catch (error) {
            console.log('err')
            socket.disconnect(true);
            return next(new Error('Connection not allowed'));
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

function getIO() {
    return io;
}

module.exports = { initializeSocket, getIO };