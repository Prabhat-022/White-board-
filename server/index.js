import express from "express";
import { io, app, server } from "./src/utils/socket.js";
import { connectDB } from "./src/utils/db.js";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth.route.js";
import groupchatRoute from "./src/routes/groupchat.route.js";
import cors from "cors";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true,
  })
);


app.use("/api/auth", authRoute);
app.use("/api/groupchat", groupchatRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});