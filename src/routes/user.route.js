import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.findUser);
router.post("/search/user", verifyToken, UserController.findByEmail);

export default router;
