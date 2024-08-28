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

export const verifyToken = async (token) => {
	try {
		const response = await fetch("/api/chat/verifyToken", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.json();
	} catch (error) {
		return error;
	}
};

export const createConversation = async (token, name, user_id) => {
	try {
		const response = await fetch("api/chat/conversation/create", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name,
				user_id,
			}),
		});
		return response.json();
	} catch (error) {
		return error;
	}
};

export const createPartConv = async (token, conver_id, receiver_id) => {
	try {
		const response = await fetch("api/chat/conversation/participants/create", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				conver_id,
				receiver_id,
			}),
		});
		return response.json();
	} catch (error) {
		return error;
	}
};
