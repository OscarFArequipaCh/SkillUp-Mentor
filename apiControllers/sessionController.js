import express from "express";
import { SessionService } from "../service/sessionService.js";

const router = express.Router();
const sessionService = new SessionService();
// GET /api/sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /api/sessions/:id
router.get("/:id", async (req, res) => {
    try {
    const session = await sessionService.getSessionById(req.params.id);
    res.json(session);
  }
    catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// POST /api/sessions
router.post("/", async (req, res) => {
    try {
    const newSession = await sessionService.createSession(req.body);
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/sessions/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await sessionService.updateSession(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/sessions/:id
router.delete("/:id", async (req, res) => {
    try {
    await sessionService.deleteSession(req.params.id);
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;