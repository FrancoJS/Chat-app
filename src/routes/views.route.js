import { Router } from "express";

const router = Router();

router.get("/forms", (req, res) => {
	res.render("forms");
});

router.get("/chat", (req, res) => {
	res.render("chat");
});
export default router;
