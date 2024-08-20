import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
	const SALT = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, SALT);
};
