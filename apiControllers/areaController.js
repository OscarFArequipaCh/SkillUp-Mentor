import express from "express";
import { AreaService } from "../service/areaService.js";

const router = express.Router();
const areaService = new AreaService();
// GET /api/areas
router.get("/", async (req, res) => {
  try {
    const areas = await areaService.getAllAreas();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /api/areas/:id
router.get("/:id", async (req, res) => {
    try {
    const area = await areaService.getAreaById(req.params.id);
    res.json(area);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// POST /api/areas
router.post("/", async (req, res) => {
    try {
    const newArea = await areaService.createArea(req.body.name, req.body.description);
    res.status(201).json(newArea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/areas/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await areaService.updateArea(req.params.id, req.body.name, req.body.description);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/areas/:id
router.delete("/:id", async (req, res) => {
    try {
    await areaService.deleteArea(req.params.id);
    res.json({ message: "Area deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;