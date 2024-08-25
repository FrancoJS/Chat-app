import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { findUserByEmail, saveMessage } from "./apiChat.js";

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
	const contentMsg = chatInput.value;
	if (contentMsg) {
		const token = localStorage.getItem("token");
		try {
			await saveMessage(contentMsg, token);
			socket.emit("chat message", chatInput.value);
			chatInput.value = "";
		} catch (error) {
			console.log(error);
		}
	}
});

const searchUserForm = document.getElementById("searchUserForm");
const searchUserInput = document.getElementById("searchUserInput");

searchUserForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = searchUserInput.value;
	if (!email) return;

	try {
		const data = await findUserByEmail(email, token);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
});
