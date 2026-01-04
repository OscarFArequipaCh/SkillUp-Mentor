import express from "express";
import { LanguageService } from "../service/languageService.js";

const router = express.Router();
const languageService = new LanguageService();

// GET /api/languages
router.get("/", async (req, res) => {
  try {
    const languages = await languageService.getAllLanguages();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newLanguage = await languageService.createLanguage(req.body.name);
    res.status(201).json(newLanguage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await languageService.deleteLanguage(req.params.id);
    res.json({ message: "Language deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;