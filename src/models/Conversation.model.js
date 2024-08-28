import { db } from "../database/database.connection.js";

const createConversation = async (name) => {
	try {
		const query = {
			text: `INSERT INTO CONVERSATIONS (NAME)
                    VALUES ($1) RETURNING *
            `,
			values: [name],
		};
		const { rows } = await db.query(query);
		return rows[0];
	} catch (error) {
		return error;
	}
};

const createPartConv = async (u_id, conver_id, receiver_id) => {
	try {
		const query = {
			text: `INSERT INTO PART_CONVER(U_ID, CONVER_ID)
				VALUES ($1, $2), ($3, $2) RETURNING *
			`,
			values: [u_id, conver_id, receiver_id],
		};
		const { rows } = await db.query(query);
		return rows;
	} catch (error) {
		return error;
	}
};
export const ConversationModel = {
	createConversation,
	createPartConv,
};
