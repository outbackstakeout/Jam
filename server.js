const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const Message = require("./models/message");
const { v4: uuidv4 } = require("uuid");
const Jam = require("./models/jam");
const Jar = require("./models/jar");
const { ObjectId } = require("mongodb");

const app = express();

// This middleware gets called automatically whenever a request gets sent to the server
app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

// api routes that link through to the controllers (users and messages)
app.use("/api/users", require("./routes/api/users"));
app.use("/api/jars", require("./routes/api/jars"));
app.use("/api/jams", require("./routes/api/jams"));
app.use("/api/messages", require("./routes/api/messages"));

async function storeMessage(msg) {
    try {
        const storeMsg = await Message.create(msg);
        console.log("storeMessage() success!");
    } catch (err) {
        console.log(`The error from storeMessage() in server.js is: ${err}`);
    }
}

async function createJam(roomName, id, user) {
    try {
        const newJam = await Jam.create({
            name: roomName,
            socket_id: id,
            users: [user],
        });
    } catch (err) {
        console.log(`The error from createJam() in server.js is: ${err}`);
    }
}

async function renameJar(id, newName) {
    try {
        const jar = await Jar.findByIdAndUpdate(id, {
            name: newName,
        });
        const renamedJar = await Jar.findById(id);
        console.log(`renameJar() in server.js says the jar is: ${renamedJar}`);
        return renamedJar;
    } catch (err) {
        console.log(`The error from renameJar() from server.js is: ${err}`);
    }
}

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});

const io = require("./config/socket").init(server);

const rooms = {};

io.on("connection", (socket) => {
    console.log(`user id: ${socket.id} has connected`);

    socket.on("createRoom", (roomName) => {
        const roomId = uuidv4();
        const newRoom = { id: roomId, name: roomName, users: [roomName.user] };
        // createJam(roomName.name, roomName.id, roomName.user);
        rooms[roomId] = newRoom;
        io.emit("roomCreated", newRoom);
    });

    socket.on("joinRoom", (roomId) => {
        // Add the user to the room with the given ID
        console.log(`User ${socket.id} joined room ${roomId}`);
        if (!rooms[roomId]) {
            return;
        }
        rooms[roomId].users.push(socket.id);
        socket.join(`room-${roomId}`);
        io.in(`room-${roomId}`).emit("userJoined", {
            roomId,
            userId: socket.id,
        });
    });

    socket.on("renameJar", (jarId, newJarName) => {
        console.log(
            `The new jar name is ${newJarName} and the jarId is ${jarId}`
        );

        if (!mongoose.Types.ObjectId.isValid(jarId)) {
            console.log(`ERRORz`);
        }
        const renamedJar = renameJar(jarId, newJarName);
        try {
            io.to(`jar:${jarId}`).emit("jarRenamed", renamedJar);
        } catch (err) {
            console.log(
                `The error from socket.on("renameJar") in server.js is: ${err}`
            );
        }

        // Jar.findByIdAndUpdate(jarId, { name: newJarName })
        //     .then((updatedJar) => {
        //         console.log(`Updated jar name to ${updatedJar.name}`);
        //         io.to(`jar:${jarId}`).emit("jarRenamed", updatedJar.name);
        //     })
        //     .catch((err) => {
        //         console.error(
        //             `Error in updating Jar name from .catch in socket.on("renamejar"), ${err}`
        //         );
        //     });
    });

    socket.on("leaveRoom", (roomId) => {
        // Remove the user from the room with the given ID
        console.log(`User ${socket.id} left room ${roomId}`);
        if (!rooms[roomId]) {
            return;
        }
        rooms[roomId].users = rooms[roomId].users.filter(
            (userId) => userId !== socket.id
        );
        socket.leave(`room-${roomId}`);
        io.in(`room-${roomId}`).emit("userLeft", { roomId, userId: socket.id });
    });

    socket.on("sendMsg", (msg) => {
        storeMessage({ text: msg });
        // io.in(`room-${roomId}`).emit("newMsg", {
        //     text: msg,
        //     sender: socket.id,
        // });
        socket.broadcast.emit("newMsg", msg);
    });

    socket.on("disconnect", () => {
        console.log(`user id: ${socket.id} has disconnected`);
        for (const roomId in rooms) {
            if (rooms[roomId].users.includes(socket.id)) {
                rooms[roomId].users = rooms[roomId].users.filter(
                    (userId) => userId !== socket.id
                );
                socket.leave(`room-${roomId}`);
                io.in(`room-${roomId}`).emit("userLeft", {
                    roomId,
                    userId: socket.id,
                });
            }
        }
    });
});
