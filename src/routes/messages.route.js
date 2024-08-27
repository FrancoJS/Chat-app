import { Router } from "express";
import { MessagesController } from "../controllers/Messages.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

// router.get("/", () => {});
router.post("/save", verifyToken, MessagesController.saveMessage);

router.get("/verifyToken", verifyToken, (req, res) => {
	return res.status(200).json({ ok: true, msg: "Token valido" });
});

export default router;
