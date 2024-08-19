const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateForms = () => {
	loginForm.addEventListener("submit", (e) => {
		const [errorEmail, errorPassword] = document.querySelectorAll(".errorMsgLogin");
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

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
			// No hay errores, se puede enviar el formulario
			console.log("Enviado");
		}
	});

	registerForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const [errorName, errorEmail, errorPassword, errorConfirm] = document.querySelectorAll(".errorMsgRegister");
		const name = e.target.name.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const confirmPassword = e.target.confirm.value;

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
			console.log("Enviado");
		}
	});
};
