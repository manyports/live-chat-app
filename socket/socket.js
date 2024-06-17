import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const io = new Server(server, {
    cors: {
        origin: ["https://chattie-ashy.vercel.app/", "https://live-chat-app-backend-production.up.railway.app"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {};
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;
	io.emit("getOnlineUsers", Object.keys(userSocketMap));
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
    socket.on('message', (message) => {
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('message', message);
        }
      });
    
      socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      });
    
});

export { app, io, server };
