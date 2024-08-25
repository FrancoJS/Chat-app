export const saveMessage = async (content, token) => {
	try {
		const response = await fetch("api/chat/messages/save", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				content,
			}),
		});
		return response.json();
	} catch (error) {
		return error;
	}
};

export const findUserByEmail = async (email, token) => {
	try {
		const response = await fetch("/api/chat/search/user", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				email,
			}),
		});
		return response.json();
	} catch (error) {
		return error;
	}
};
