import { createToken } from "../middleware/jwt.middleware.js";
import { UserModel } from "../models/User.model.js";
import { comparePassword, hashPassword } from "../services/passsword.service.js";

const createUser = async (req, res) => {
	const { username, email, password } = req?.body;
	if (!username || !email || !password)
		return res.status(400).json({ ok: false, msg: "¡Faltan parametros obligatorios!" });
	try {
		const userInDB = await UserModel.findByEmail(email);
		if (userInDB) return res.status(409).json({ ok: false, msg: "¡Usuario ya se encuentra registrado!" });

		const hashedPassword = await hashPassword(password);
		const newUser = await UserModel.createUser(username, email, hashedPassword);
		// TODO VER SI ES NECESARIO DEVOLVER EL NEWUSER
		const token = createToken(newUser.username, newUser.email, newUser.u_id);
		return res.status(200).json({ ok: true, user: newUser, msg: "¡Usuario registrado con exito!", token });
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Ocurrio un problema con la consulta", error });
	}
};

const findUser = async (req, res) => {
	const { email, password } = req?.body;
	if (!email || !password) return res.status(400).json({ ok: false, msg: "¡Faltan parametros obligatorios!" });

	try {
		const userInDB = await UserModel.findByEmail(email);
		if (!userInDB) return res.status(404).json({ ok: false, msg: "¡Usuario no se encuentra registrado!" });
		const match = await comparePassword(password, userInDB.password);
		if (!match) return res.status(400).json({ ok: false, msg: "¡Usuario o contraseña incorrectos!" });
		return res.status(200).json({ ok: true, user: userInDB, msg: "¡Inicio de sesion exitoso!" });
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Ocurrio un problema en la consulta", error });
	}
};

export const UserController = {
	createUser,
	findUser,
};
