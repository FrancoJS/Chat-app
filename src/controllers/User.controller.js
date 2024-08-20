import { UserModel } from "../models/User.model.js";
import { hashPassword } from "../services/passsword.service.js";

const createUser = async (req, res) => {
	const { username, email, password } = req?.body;
	if (!username || !email || !password)
		return res.status(400).json({ ok: false, msg: "¡Faltan parametros obligatorios!" });
	try {
		const userInDB = await UserModel.findByEmail(email);
		if (userInDB) return res.status(409).json({ ok: false, msg: "¡Usuario ya se encuentra registrado!" });

		const hashedPassword = await hashPassword(password);
		const newUser = await UserModel.createUser(username, email, hashedPassword);
		return res.status(200).json({ ok: true, msg: newUser });
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Ocurrio un problema con la consulta", error });
	}
};

export const UserController = {
	createUser,
};
