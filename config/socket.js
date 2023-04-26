
// import { io } from 'socket.io-client'


// const JoinRoomButton = document.getElementById("room-button");
// const messageInput = document.getElementById("message-input");
// const roomInput = document.getElementById("room-input");
// const form = document.getElementById("form");

// const socket= io('http://localhost:3000')
// socket.on('connect', () => {
//     displayMessage(`You connected with id: ${socket.id}`)
// })

// socket.on('receive', message => {
//     displayMessage(message)
// })


// form.addEventListener("submit", e => {
//     e.preventDefault()
//     const message = messageInput.value;
//     const room = roomInput.value;

//     if (message === "") return 
//     displayMessage(message)
//     socket.emit('send-message', message, room)

//     messageInput.value = ""
// })


// JoinRoomButton.addEventListener("click", () => {
//     const room = roomInput.value
//     socket.emit('join-room', room, message =>{
//         displayMessage(message)
//     })
// })

// function displayMessage(message) {
//     const div = document.createElement("div")
//     div.textContent = message
//     document.getElementById("message-container").append(div)
// }

let io;

module.exports = {
    init: (httpServer) => {
        const { Server } = require("socket.io");
        io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized");
        }
        return io;
    },
};
