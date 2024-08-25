import { Server } from "socket.io";
import { db } from "./database/database.connection.js";

export const initializeSocketIo = (server) => {
	const ioServer = new Server(server);

	ioServer.on("connection", async (socket) => {
		console.log("Un usuario se ha conectado");

		socket.on("chat message", async (message) => {
			try {
				const { rows: id } = await db.query({
					text: "SELECT MAX(MSG_ID) FROM MESSAGES WHERE U_ID = $1",
					values: [socket.handshake.auth.u_id],
				});
				const lastMessageId = id[0].max;

				const { rows: date } = await db.query({
					text: "SELECT CREATED_AT FROM MESSAGES WHERE MSG_ID = $1 AND U_ID = $2",
					values: [lastMessageId, socket.handshake.auth.u_id],
				});
				const dateMsg = date[0].created_at;
				ioServer.emit("chat message", message, lastMessageId, dateMsg);
			} catch (error) {
				console.log(error);
			}
		});

		if (!socket.recovered) {
			try {
				const query = {
					text: `SELECT MSG_ID, CONTENT, CREATED_AT FROM MESSAGES WHERE MSG_ID > $1 AND U_ID = $2 `,
					values: [socket.handshake.auth.serverOffset ?? 0, socket.handshake.auth.u_id],
				};
				const { rows } = await db.query(query);
				rows.forEach((row) => {
					socket.emit("chat message", row.content, row.msg_id, row.created_at);
				});
			} catch (error) {
				console.log(error);
			}
		}
	});
};
