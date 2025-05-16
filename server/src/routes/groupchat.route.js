import express from "express";
import { sendMessage, getMessages, joinRoom } from "../controllers/groupchat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-message", protectRoute, sendMessage);
router.get("/get-messages/:roomId", protectRoute, getMessages);

//protectRoute is not working 
router.post("/joinroom", protectRoute, joinRoom);

export default router;