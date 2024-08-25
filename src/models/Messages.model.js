import { db } from "../database/database.connection.js";

const saveMessage = async (content, u_id) => {
	const query = {
		text: `INSERT INTO MESSAGES (CONTENT, U_ID)
                VALUES ($1, $2) RETURNING * 
            `,
		values: [content, u_id],
	};
	try {
		const { rows } = await db.query(query);
		return rows[0];
	} catch (error) {
		console.log(error);
	}
};

export const MessagesModel = {
	saveMessage,
};
