import { verifyToken, saveMessage } from "./apiChat.js";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const token = localStorage.getItem("token");
if (!token) window.location.href = "/forms";

const res = await verifyToken(token);
if (!res.ok) {
	window.location.href = "/forms";
	localStorage.removeItem("token");
	localStorage.removeItem("username");
	localStorage.removeItem("u_id");
}

const u_id = localStorage.getItem("u_id");
const socket = io({
	auth: {
		serverOffset: 0,
		u_id,
	},
});

const chatBox = document.querySelector(".chatBox");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

const username = localStorage.getItem("username");
socket.on("chat message", (message, lastMessageId, dateMsg) => {
	const item = `<div class="chatMsg">
							<div class="userName">
								<h3>${username}</h3>
								<span class="dateMsg">${dateMsg.slice(0, 10)}</span>
							</div>
							<p>${message}</p>
						</div>`;
	chatBox.insertAdjacentHTML("beforeend", item);
	socket.auth.serverOffset = lastMessageId;
	chatBox.scrollTop = chatBox.scrollHeight;
});

chatForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const contentMsg = chatInput.value;
	if (contentMsg) {
		try {
			await saveMessage(contentMsg, token);
			socket.emit("chat message", chatInput.value);
			chatInput.value = "";
		} catch (error) {
			console.log(error);
		}
	}
});
