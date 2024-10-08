import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.findUser);
router.post("/search/user", verifyToken, UserController.findByEmail);

router.get("/verifyToken", verifyToken, (req, res) => {
	return res.status(200).json({ ok: true, msg: "Token valido" });
});

export default router;
