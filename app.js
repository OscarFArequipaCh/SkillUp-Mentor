import cors from "cors";
import express from "express";

import userController from "./apiControllers/userController.js";
import apprenticeController from "./apiControllers/apprenticeController.js";
import mentorController from "./apiControllers/mentorController.js";
import courseController from "./apiControllers/courseController.js";
import sessionController from "./apiControllers/sessionController.js";
import chatController from "./apiControllers/chatController.js";
import messageController from "./apiControllers/messageController.js";
import areaController from "./apiControllers/areaController.js";
import pedagogicalMethodController from "./apiControllers/pedagogicalMethodController.js";
import ratingController from "./apiControllers/ratingController.js";
import resourceController from "./apiControllers/resourceController.js"

const app = express();

// 🧩 CORS — habilita acceso desde el frontend (127.0.0.1 o localhost:5500)
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware para JSON
app.use(express.json());

// Rutas base
app.use("/api/users", userController);
app.use("/api/apprentices", apprenticeController);
app.use("/api/mentors", mentorController);
app.use("/api/courses", courseController);
app.use("/api/sessions", sessionController);
app.use("/api/chats", chatController);
app.use("/api/messages", messageController);
app.use("/api/areas", areaController);
app.use("/api/pedagogical-methods", pedagogicalMethodController);
app.use("/api/ratings", ratingController);
app.use("/api/resources", resourceController)

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
