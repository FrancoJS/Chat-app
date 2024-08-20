export const registerUser = async (username, email, password) => {
	try {
		const response = await fetch("/api/chat/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
		return response.json();
	} catch (error) {
		return error;
	}
};

export const loginUser = async (email, password) => {
	return fetch("/api/chat/login", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			return error;
		});
};
