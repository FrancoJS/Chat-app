import { db } from "../database/database.connection.js";

const createUser = async (username, email, password) => {
	const query = {
		text: `INSERT INTO USERS (USERNAME, EMAIL, PASSWORD)
        VALUES($1, $2, $3) 
        RETURNING *`,
		values: [username, email, password],
	};
	try {
		const { rows } = await db.query(query);
		return rows[0];
	} catch (error) {
		if (error.code === "23505") {
			throw new Error("El email ya existe");
		}
	}
};

const findByEmail = async (email) => {
	const query = {
		text: `SELECT * FROM USERS WHERE EMAIL = $1`,
		values: [email],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

export const UserModel = {
	createUser,
	findByEmail,
};
