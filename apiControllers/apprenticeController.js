import express from "express";
import { ApprenticeService } from "../service/apprenticeService.js";

const router = express.Router();
const apprenticeService = new ApprenticeService();

// GET /api/apprentices
router.get("/", async (req, res) => {
  try {
    const apprentices = await apprenticeService.getAllApprentices();
    res.json(apprentices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/apprentices/:id
router.get("/:id", async (req, res) => {
  try {
    const apprentice = await apprenticeService.getApprenticeById(req.params.id);
    res.json(apprentice);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/apprentices
router.post("/", async (req, res) => {
  try {
    const newApprentice = await apprenticeService.createApprentice(req.body);
    res.status(201).json(newApprentice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/apprentices/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await apprenticeService.updateApprentice(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/apprentices/:id
router.delete("/:id", async (req, res) => {
  try {
    await apprenticeService.deleteApprentice(req.params.id);
    res.json({ message: "Apprentice deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
