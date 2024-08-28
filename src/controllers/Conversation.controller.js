import { ConversationModel } from "../models/Conversation.model.js";

const createConversation = async (req, res) => {
	try {
		const { name, user_id } = req?.body;
		const u_id = req.u_id;
		if (u_id === user_id) return res.status(400).json({ ok: false, msg: "" });

		if (!name) return res.status(400).json({ ok: false, msg: "El nombre de la conversacion es necesario" });
		const username = req.username;
		const conversationName = `${username}-${name}`;

		const newConversation = await ConversationModel.createConversation(conversationName);
		if (newConversation) {
			return res.status(200).json({ ok: true, msg: "Conversacion creada exitosamente", conversation: newConversation });
		}
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Ocurrio un problema en la consulta" });
	}
};

const createPartConv = async (req, res) => {
	try {
		const { conver_id, receiver_id } = req?.body;
		if (!conver_id || !receiver_id)
			return res.status(400).json({ ok: false, msg: "conver_id y receiver_id son necesarios" });
		const u_id = req.u_id;
		const participants = await ConversationModel.createPartConv(u_id, conver_id, receiver_id);
		if (participants) {
			return res.status(200).json({ ok: true, msg: "Participantes creados exitosamente", participants });
		}
	} catch (error) {
		return res.status(400).json({ ok: false, msg: "Ocurrio un problema en la consulta" });
	}
};

export const ConversationController = {
	createConversation,
	createPartConv,
};
