// apiControllers/userController.js
import express from "express";
import path from "path";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { fileURLToPath } from "url";
import { UserService } from "../service/userService.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();
const userService = new UserService();

// (opcional) para poder resolver rutas si lo necesitas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/:id
router.get("/:id"/*, authMiddleware*/, async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.getUserByEmail({ email, password });
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


// POST /api/users - Crear usuario con foto opcional
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const data = req.body || {};
    const file = req.file || null;
    const newUser = await userService.createUser(data, file);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/users/:id - Actualizar usuario con foto opcional
router.put("/:id"/*, authMiddleware*/, upload.single("photo"), async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body || {};
    const file = req.file || null;
    const updatedUser = await userService.updateUser(id, data, file);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id"/*, authMiddleware*/, async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
