import jwt from "jsonwebtoken";

export const createToken = (username, email, u_id) => {
	return jwt.sign({ username, email, u_id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};

export const verifyToken = (req, res, next) => {
	let token = req.headers.authorization;

	if (!token) return res.status(401).json({ ok: false, msg: "Usuario no autorizado" });
	token = token.split(" ")[1];
	try {
		const { username, email, u_id } = jwt.verify(token, process.env.JWT_SECRET);
		req.u_id = u_id;
		next();
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Token invalido", error });
	}
};
