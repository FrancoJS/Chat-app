import express from "express";
import "dotenv/config";
import path from "path";
import viewsRouter from "./routes/views.route.js";
import userRouter from "./routes/user.route.js";
import messagesRouter from "./routes/messages.route.js";
import conversationRouter from "./routes/conversation.route.js";
import logger from "morgan";
import { createServer } from "node:http";
import { initializeSocketIo } from "./socket.js";
import cors from "cors";

const app = express();
const server = createServer(app);

// Funcion para inicializar socketIo
initializeSocketIo(server);

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(logger("dev"));
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use("/", viewsRouter);
app.use("/api/chat", userRouter);
app.use("/api/chat/messages", messagesRouter);
app.use("/api/chat/conversation", conversationRouter);

// Puerto de variables
const PORT = process.env.PORT;
server.listen(PORT, () => {
	console.log(`Escuchando puerto ${PORT}`);
});
