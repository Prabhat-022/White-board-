import User from "../model/auth.model.js";
import Message from "../model/groupchat.model.js";
import { io } from "../utils/socket.js";
import dotenv from "dotenv";
dotenv.config();


export const sendMessage = async (req, res) => {

    try {

        const { roomId, message, image } = req.body;
        const userId = req.user._id;

        if (!roomId || !message) {
            return res.status(400).json({ message: "Room ID and message are required" });
        }

        const newMessage = new Message({
            userId,
            roomId,
            message,
            image,
        });

        await newMessage.save();

        console.log("new message", newMessage)

        io.emit("new message", newMessage);

        res.status(200).json(newMessage);

    } catch (error) {

        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

export const getMessages = async (req, res) => {

    const roomId = req.params.roomId;
    console.log("roomId", roomId);

    try {
        const messages = await Message.find({ roomId });
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const joinRoom = async (req, res) => {

    try {
        const { roomId, username, userId } = req.body;


        if (!roomId || !username) {
            return res.status(400).json({ message: "Room ID and username are required" });
        }

        const user = await User.findById({ _id: userId, username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        } else {

            res.status(200).json({ message: "Joined room successfully" });
        }

    } catch (error) {

        console.log("Error in joinRoom controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
