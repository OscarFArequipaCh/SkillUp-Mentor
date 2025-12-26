import express from "express";
import { RatingService } from "../service/ratingService.js";

const router = express.Router();
const ratingService = new RatingService();
// GET /api/ratings
router.get("/", async (req, res) => {
  try {
    const ratings = await ratingService.getAllRatings();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /api/ratings/:id
router.get("/:id", async (req, res) => {
    try {
    const rating = await ratingService.getRatingById(req.params.id);
    res.json(rating);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// GET /api/ratings/user/:userId
router.get("/user/:userId", async (req, res) => {
    try {
    const rating = await ratingService.getRatingByUserId(req.params.userId);
    res.json(rating);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/ratings
router.post("/", async (req, res) => {
    try {
    const newRating = await ratingService.createRating(req.body);
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/ratings/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await ratingService.updateRating(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/ratings/:id
router.delete("/:id", async (req, res) => {
    try {
    await ratingService.deleteRating(req.params.id);
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;