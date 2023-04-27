const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const Message = require('./models/message');
const { v4: uuidv4 } = require('uuid');

const app = express();

// This middleware gets called automatically whenever a request gets sent to the server
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// API routes that link through to the controllers (users and messages)
app.use('/api/users', require('./routes/api/users'));
app.use('/api/messages', require('./routes/api/messages'));

async function storeMessage(msg) {
    try {
        const storeMsg = await Message.create(msg);
        console.log('storeMessage() success!');
    } catch (err) {
        console.log(`The error from storeMessage() in server.js is: ${err}`);
    }
}

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});

const io = require('./config/socket').init(server);

const rooms = {};

io.on('connection', (socket) => {
    console.log(`user id: ${socket.id} has connected`);

    socket.on('createRoom', (roomName) => {
        const roomId = uuidv4();
        const newRoom = { id: roomId, name: roomName, users: [] };
        rooms[roomId] = newRoom;
        io.emit('roomCreated', newRoom);
    });

    socket.on('joinRoom', (roomId) => {
        // Add the user to the room with the given ID
        console.log(`User ${socket.id} joined room ${roomId}`);
        if (!rooms[roomId]) {
            return;
        }
        rooms[roomId].users.push(socket.id);
        socket.join(`room-${roomId}`);
        io.in(`room-${roomId}`).emit('userJoined', { roomId, userId: socket.id });
    });

    socket.on('leaveRoom', (roomId) => {
        // Remove the user from the room with the given ID
        console.log(`User ${socket.id} left room ${roomId}`);
        if (!rooms[roomId]) {
            return;
        }
        rooms[roomId].users = rooms[roomId].users.filter((userId) => userId !== socket.id);
        socket.leave(`room-${roomId}`);
        io.in(`room-${roomId}`).emit('userLeft', { roomId, userId: socket.id });
    });

    socket.on('sendMsg', (msg, roomId) => {
        storeMessage({ text: msg });
        io.in(`room-${roomId}`).emit('newMsg', { text: msg, sender: socket.id });
    });

    socket.on('disconnect', () => {
        console.log(`user id: ${socket.id} has disconnected`);
        for (const roomId in rooms) {
            if (rooms[roomId].users.includes(socket.id)) {
                rooms[roomId].users = rooms[roomId].users.filter((userId) => userId !== socket.id);
                socket.leave(`room-${roomId}`);
                io.in(`room-${roomId}`).emit('userLeft', { roomId, userId: socket.id });
            }
        }
    });
})
