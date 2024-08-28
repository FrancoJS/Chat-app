import { createConversation, createPartConv, findUserByEmail } from "./apiChat.js";
const token = localStorage.getItem("token");
const searchUserForm = document.getElementById("searchUserForm");
const searchUserInput = document.getElementById("searchUserInput");
const modalSearchUser = document.querySelector(".modalSearchUser");
const modal = document.querySelector(".modal");
const modalFail = document.querySelector(".modalFail");

searchUserForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = searchUserInput.value;
	if (!email) return;

	try {
		const userData = await findUserByEmail(email, token);
		if (!userData.ok) {
			modalFail.textContent = "";
			const h3 = document.createElement("h3");
			h3.textContent = userData.msg;
			modalFail.appendChild(h3);
			modalFail.classList.remove("disabled");
			searchUserInput.value = "";
			setTimeout(() => {
				modalFail.classList.add("disabled");
			}, 2500);
			return;
		}
		modalSearchUser.innerHTML = "";
		const { msg, user } = userData;
		const item = `<h2>${msg} 
				<span class="material-symbols-outlined">check</span>
					</h2>
				<p>Nombre de Usuario: ${user.username}</p>
				<p>Correo: ${user.email}</p>
				<div>
					<button id="sendMessageModal" type="button">Enviar mensaje</button>
					<button id="cancelModal" type="button">Cancelar</button>
				</div>`;
		modalSearchUser.insertAdjacentHTML("beforeend", item);
		modal.style.display = "block";
		modalSearchUser.classList.remove("disabled");

		const cancelModal = document.getElementById("cancelModal");
		cancelModal.addEventListener("click", () => {
			searchUserInput.value = "";
			modal.style.display = "none";
			modalSearchUser.classList.add("disabled");
		});

		// TO DO: QUE AL APRETAR EL BOTON DE ENVIAR INICIE UNA NUEVA CONVERSACION, CON EL USUARIO ENCONTRADO Y REALIZAR INSERCION EN LA BASE DE DATOS, REALIZAR LOGICA DETRAS DE ESTO
		const sendMessageModal = document.getElementById("sendMessageModal");
		sendMessageModal.addEventListener("click", async () => {
			try {
				const conversationData = await createConversation(token, user.username, user.u_id);
				const { conversation } = conversationData;
				const { conver_id } = conversation;
				if (!conversationData.ok) {
					modalSearchUser.classList.add("disabled");
					modalFail.textContent = "";
					const h3 = document.createElement("h3");
					h3.textContent = conversationData.msg;
					modalFail.appendChild(h3);
					modalFail.classList.remove("disabled");
					modal.style.display = "none";
					searchUserInput.value = "";
					setTimeout(() => {
						modalFail.classList.add("disabled");
					}, 2500);
					return;
				}
				const listAllChats = document.querySelector(".listAllChats");
				const itemLi = `<li>
								<div class="listChat">
									<a href="">${user.username}</a>
									<a href="">Ultimo mensaje...</a>
								</div>
							</li>`;
				listAllChats.insertAdjacentHTML("beforeend", itemLi);
				const containerKeyboardChat = document.querySelector(".containerKeyboardChat");
				containerKeyboardChat.style.display = "block";
				modalSearchUser.classList.add("disabled");
				modal.style.display = "none";
				try {
					const participantsData = await createPartConv(token, conver_id, user.u_id);
					console.log(participantsData);
				} catch (error) {
					console.error(error);
				}
			} catch (error) {
				console.error(error);
			}
		});
	} catch (error) {
		console.log(error);
	}
});

//deshabilitar modal apretando a los lados
modal.addEventListener("click", () => {
	searchUserInput.value = "";
	modal.style.display = "none";
	modalSearchUser.classList.add("disabled");
});
