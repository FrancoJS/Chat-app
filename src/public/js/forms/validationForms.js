import { loginUser, registerUser } from "./api.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// MODAL PARA MOSTRAR CUANDO UN REGISTRO SE HIZO EXITOSAMENTE
const modalSucces = document.querySelector(".modalSucces");
// H3 CON MENSAJE DE APROBADO
const msgSuccesUser = document.getElementById("msgSuccesUser");

export const validateLogin = () => {
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const errorLoginUser = document.getElementById("errorLoginUser");
		const [errorEmail, errorPassword] = document.querySelectorAll(".errorMsgLogin");
		const email = e.target.email.value.trim();
		const password = e.target.password.value.trim();

		// Validacion Email
		errorEmail.textContent = !email
			? "El email es un campo obligatorio."
			: !regexEmail.test(email)
			? "Debe ingresar un email valido."
			: email.length > 50
			? "El email puede tener 50 caracteres como maximo."
			: "";
		// Validacion contraseña
		errorPassword.textContent = !password
			? "La contraseña es un campo obligatorio."
			: password.length < 8
			? "La contraseña debe tener 8 caracteres minimo."
			: password.length > 128
			? "Longitud maxima de contraseña excedida."
			: "";

		if (!errorEmail.textContent && !errorPassword.textContent) {
			const data = await loginUser(email, password);
			if (!data.ok) {
				errorLoginUser.textContent = data.msg;
			} else {
				modalSucces.classList.remove("disabled");
				msgSuccesUser.textContent = data.msg;
				setTimeout(() => {
					modalSucces.classList.add("disabled");
				}, 3000);
			}
		}
	});
};

export const validateRegister = () => {
	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const errorPostUser = document.getElementById("errorPostUser");
		const [errorName, errorEmail, errorPassword, errorConfirm] = document.querySelectorAll(".errorMsgRegister");
		const name = e.target.name.value.trim();
		const email = e.target.email.value.trim();
		const password = e.target.password.value.trim();
		const confirmPassword = e.target.confirm.value.trim();

		errorName.textContent = !name
			? "El nombre es un campo obligatorio"
			: name.length > 50
			? "El nombre debe tener 50 caracteres como maximo."
			: "";

		errorEmail.textContent = !email
			? "El email es un campo obligatorio."
			: !regexEmail.test(email)
			? "Debe ingresar un email valido."
			: email.length > 50
			? "El email puede tener 50 caracteres como maximo."
			: "";

		errorPassword.textContent = !password
			? "La contraseña es un campo obligatorio."
			: password.length < 8
			? "La contraseña debe tener 8 caracteres minimo."
			: password.length > 128
			? "Longitud maxima de contraseña excedida."
			: "";

		errorConfirm.textContent = !confirmPassword
			? "Debe confirmar la contraseña"
			: password !== confirmPassword
			? "Las contraseña no coincide"
			: "";

		if (!errorName.textContent && !errorEmail.textContent && !errorPassword.textContent && !errorConfirm.textContent) {
			// No hay errores, se puede enviar el formulario
			const data = await registerUser(name, email, password);
			if (!data.ok) {
				errorPostUser.textContent = data.msg;
			} else {
				modalSucces.classList.remove("disabled");
				msgSuccesUser.textContent = data.msg;
				setTimeout(() => {
					modalSucces.classList.add("disabled");
				}, 3000);
			}
		}
	});
};
