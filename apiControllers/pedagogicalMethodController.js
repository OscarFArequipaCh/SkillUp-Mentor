import express from "express";
import { PedagogicalMethodService } from "../service/pedagogicalMethodService.js";

const router = express.Router();
const pedagogicalMethodService = new PedagogicalMethodService();

// GET /api/pedagogical-methods
router.get("/", async (req, res) => {
  try {
    const methods = await pedagogicalMethodService.getAllMethods();
    res.json(methods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/pedagogical-methods/:id
router.get("/:id", async (req, res) => {
  try {
    const method = await pedagogicalMethodService.getMethodById(req.params.id);
    res.json(method);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// POST /api/pedagogical-methods
router.post("/", async (req, res) => {
  try {
    const newMethod = await pedagogicalMethodService.createMethod(req.body.name, req.body.description);
    res.status(201).json(newMethod);
  }
    catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/pedagogical-methods/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await pedagogicalMethodService.updateMethod(req.params.id, req.body.name, req.body.description);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/pedagogical-methods/:id
router.delete("/:id", async (req, res) => {
    try {
    await pedagogicalMethodService.deleteMethod(req.params.id);
    res.json({ message: "Pedagogical Method deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;
