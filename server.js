const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

// api routes that link through to the controllers (users and messages)
app.use("/api/users", require("./routes/api/users"));
app.use("/api/messages", require("./routes/api/messages"));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});

const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
    console.log(`user id: ${socket.id} has connected`);

    socket.on("disconnect", () => {
        console.log(`user id: ${socket.id} has disconnected`);
    });

    // 💡 from ChatPage.jsx > ChatPage() > handleSubmit() > socketRef.current.emit("sendMsg", input);
    socket.on("sendMsg", (msg) => {
        // 💡 to ChatPage.jsx > ChatPage() > useEffect() > socket.on("newMsg", (msg)
        socket.broadcast.emit("newMsg", msg);
    });
});
