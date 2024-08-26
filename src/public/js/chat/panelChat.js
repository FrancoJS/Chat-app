import { findUserByEmail } from "./apiChat.js";
const token = localStorage.getItem("token");
const searchUserForm = document.getElementById("searchUserForm");
const searchUserInput = document.getElementById("searchUserInput");
const modalSearchUser = document.querySelector(".modalSearchUser");
const modal = document.querySelector(".modal");

searchUserForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = searchUserInput.value;
	if (!email) return;

	try {
		const data = await findUserByEmail(email, token);
		if (!data.ok) {
			const modalFail = document.querySelector(".modalFail");
			modalFail.textContent = "";
			const h3 = document.createElement("h3");
			h3.textContent = data.msg;
			modalFail.appendChild(h3);
			modalFail.classList.remove("disabled");
			searchUserInput.value = "";
			setTimeout(() => {
				modalFail.classList.add("disabled");
			}, 2500);
			return;
		}
		modalSearchUser.innerHTML = "";
		const { msg, user } = data;
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
	} catch (error) {
		console.log(error);
	}
});

modal.addEventListener("click", () => {
	searchUserInput.value = "";
	modal.style.display = "none";
	modalSearchUser.classList.add("disabled");
});
