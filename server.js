import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connect.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/authrouter.js";
import messageRoutes from "./routers/messagerouter.js";
import userRoutes from "./routers/userrouter.js";

import { app, server } from "./socket/socket.js";


dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the server");
})

server.listen(PORT, () => {
    ConnectDB();
    console.log(`Server started at ${PORT}`);
});