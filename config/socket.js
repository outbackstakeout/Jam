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
