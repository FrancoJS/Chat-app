import jwt from "jsonwebtoken";

export const createToken = (username, email, u_id) => {
	return jwt.sign({ username, email, u_id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};
