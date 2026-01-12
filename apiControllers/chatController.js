import express from "express";
import { ChatService } from "../service/chatService.js";

const router = express.Router();
const chatService = new ChatService();

// GET /api/chats
router.get("/", async (req, res) => {
  try {
    const chats = await chatService.getAllChats();
    res.json(chats);
  }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/chats/:id
router.get("/:id", async (req, res) => {
    try {
    const chat = await chatService.getChatById(req.params.id);
    res.json(chat);
  }
    catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/chats
router.post("/", async (req, res) => {
    try {
    const newChat = await chatService.createChat(req.body);
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/chats/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await chatService.updateChat(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/chats/:id
router.delete("/:id", async (req, res) => {
    try {
    await chatService.deleteChat(req.params.id);
    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;