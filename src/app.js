import express from "express";
import "dotenv/config";
import path from "path";
import viewsRouter from "./routes/views.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use("/", viewsRouter);
app.use("/api/chat", userRouter);

// Puerto de variables
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Escuchando puerto ${PORT}`);
});
