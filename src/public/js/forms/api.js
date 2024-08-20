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
