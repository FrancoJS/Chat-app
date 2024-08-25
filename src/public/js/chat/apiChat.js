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
