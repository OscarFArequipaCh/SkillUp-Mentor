import express from "express";
import { ResourceService } from "../service/resourceService.js";

const router = express.Router();
const resourceService = new ResourceService();
// GET /api/recourses
router.get("/", async (req, res) => {
  try {
    const resources = await resourceService.getAllResources();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /api/recourses/:id
router.get("/:id", async (req, res) => {
    try {
    const resource = await resourceService.getResourceById(req.params.id);
    res.json(resource);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// POST /api/recourses
router.post("/", async (req, res) => {
    try {
    const newResource = await resourceService.createResource(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/recourses/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await resourceService.updateResource(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/recourses/:id
router.delete("/:id", async (req, res) => {
    try {
    await resourceService.deleteResource(req.params.id);
    res.json({ message: "Recourse deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;
