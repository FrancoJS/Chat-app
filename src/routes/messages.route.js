import { Router } from "express";
import { MessagesController } from "../controllers/Messages.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

// router.get("/", () => {});
router.post("/save", verifyToken, MessagesController.saveMessage);

export default router;
