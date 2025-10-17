import express from "express";
import { MentorService } from "../service/mentorService.js";

const router = express.Router();
const mentorService = new MentorService();

// GET /api/mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await mentorService.getAllMentors();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/mentors/:id
router.get("/:id", async (req, res) => {
  try {
    const mentor = await mentorService.getMentorById(req.params.id);
    res.json(mentor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/mentors
router.post("/", async (req, res) => {
  try {
    const newMentor = await mentorService.createMentor(req.body);
    res.status(201).json(newMentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/mentors/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await mentorService.updateMentor(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/mentors/:id
router.delete("/:id", async (req, res) => {
  try {
    await mentorService.deleteMentor(req.params.id);
    res.json({ message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
