import { Server } from "socket.io";
import express from "express";
import http from "http";


const app = express();
const server = http.createServer(app);

    
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }
  
  // used to store online users
  const userSocketMap = {}; // {userId: socketId}


io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    console.log("userId", userId)
    if (userId) userSocketMap[userId] = socket.id;
  
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    // socket.on("join room", ({roomId, username }) => {
    //     io.emit("room joined", username);
    //     socket.join(roomId);
    // })

    // socket.on("send message", (message) => {
    //     socket.broadcast.emit("receive message", message);
    // })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
});

export { io, app, server };
