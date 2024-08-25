import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const token = localStorage.getItem("token");
if (!token) window.location.href = "/forms";

const socket = io();

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBox = document.querySelector(".chatBox");

socket.on("chat message", (message) => {
	const item = `<div class="chatMsg">
							<div class="userName">
								<h3>Jean</h3>
								<span class="dateMsg"></span>
							</div>
							<p>${message}</p>
						</div>`;
	chatBox.insertAdjacentHTML("beforeend", item);
});

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (chatInput.value) {
		socket.emit("chat message", chatInput.value);
		chatInput.value = "";
	}
});
