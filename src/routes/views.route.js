import { Router } from "express";

const router = Router();

router.get("/forms", (req, res) => {
	res.render("forms");
});

export default router;
