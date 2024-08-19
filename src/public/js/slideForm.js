const signinBtn = document.querySelector(".signinBtn");
const signupBtn = document.querySelector(".signupBtn");
const body = document.querySelector("body");

export const slideForm = () => {
	signupBtn.addEventListener("click", () => {
		body.classList.add("slide");
	});
	signinBtn.addEventListener("click", () => {
		body.classList.remove("slide");
	});
};
