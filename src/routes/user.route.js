import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.findUser);

export default router;
