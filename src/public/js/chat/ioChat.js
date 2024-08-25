import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { saveMessage } from "./apiChat.js";

const token = localStorage.getItem("token");
if (!token) window.location.href = "/forms";

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
	if (chatInput.value) {
		const content = chatInput.value.trim();
		const token = localStorage.getItem("token");
		try {
			await saveMessage(content, token);
			socket.emit("chat message", chatInput.value);
			chatInput.value = "";
		} catch (error) {
			console.log(error);
		}
	}
});
