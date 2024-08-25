import { MessagesModel } from "../models/Messages.model.js";

const saveMessage = async (req, res) => {
	try {
		const { content } = req.body;
		const u_id = req.u_id;
		if (!content) return res.status(400).json({ ok: false, msg: "El contenido del mensaje no puede estar vacio" });

		const newMessage = await MessagesModel.saveMessage(content, u_id);
		if (!newMessage) return res.status(404).json({ ok: false, msg: "Usuario no existe" });

		return res.status(200).json({ ok: true, newMessage, msg: "Mensaje registrado con exito" });
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Ocurrio un problema con la consulta", error });
	}
};

export const MessagesController = {
	saveMessage,
};
