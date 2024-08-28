import { Router } from "express";
import { ConversationController } from "../controllers/Conversation.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

router.post("/create", verifyToken, ConversationController.createConversation);
router.post("/participants/create", verifyToken, ConversationController.createPartConv);

export default router;
