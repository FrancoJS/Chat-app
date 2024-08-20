import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const db = new Pool({
	connectionString,
	allowExitOnIdle: true,
});

try {
	await db.query("SELECT NOW()");
	console.log("Base de datos conectada");
} catch {
	console.error("Error al conectar a la base de datos");
}
