import express from "express";
import userController from "./apiControllers/userController.js";
import apprenticeController from "./apiControllers/apprenticeController.js";
import mentorController from "./apiControllers/mentorController.js";

const app = express();
app.use(express.json());

// Rutas base
app.use("/api/users", userController);
app.use("/api/apprentices", apprenticeController);
app.use("/api/mentors", mentorController);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
