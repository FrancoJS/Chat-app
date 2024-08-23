import { Server } from "socket.io";

export const initializeSocketIo = (server) => {
	const io = new Server(server);

	io.on("connection", (socket) => {
		console.log("Un usuario se ha conectado");

		socket.on("chat message", (message) => {
			io.emit("chat message", message);
		});
	});
};
