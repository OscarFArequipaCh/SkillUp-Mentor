import express from "express";
import { MessageService } from "../service/messageService.js";

const router = express.Router();
const messageService = new MessageService();
// GET /api/messages
router.get("/", async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /api/messages/:id
router.get("/:id", async (req, res) => {
    try {
    const message = await messageService.getMessageById(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// POST /api/messages
router.post("/", async (req, res) => {
    try {
    const newMessage = await messageService.createMessage(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/messages/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await messageService.updateMessage(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/messages/:id
router.delete("/:id", async (req, res) => {
    try {
    await messageService.deleteMessage(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;