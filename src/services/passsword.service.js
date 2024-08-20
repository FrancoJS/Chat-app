import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
	const SALT = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, SALT);
};

export const comparePassword = async (password, userPassword) => {
	return await bcrypt.compare(password, userPassword);
};
