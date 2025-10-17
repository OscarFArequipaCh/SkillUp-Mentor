import express from "express";
import { UserService } from "../service/userService.js";

const router = express.Router();
const userService = new UserService();

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
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
