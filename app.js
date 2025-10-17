import express from "express";
import userController from "./apiControllers/userController.js";
import apprenticeController from "./apiControllers/apprenticeController.js";
import mentorController from "./apiControllers/mentorController.js";
import courseController from "./apiControllers/courseController.js";
import sessionController from "./apiControllers/sessionController.js";
import chatController from "./apiControllers/chatController.js";
import messageController from "./apiControllers/messageController.js";

const app = express();
app.use(express.json());

// Rutas base
app.use("/api/users", userController);
app.use("/api/apprentices", apprenticeController);
app.use("/api/mentors", mentorController);
app.use("/api/courses", courseController);
app.use("/api/sessions", sessionController);
app.use("/api/chats", chatController);
app.use("/api/messages", messageController);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
