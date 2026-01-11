import express from 'express';
import { ExperienceService } from '../service/experienceService.js';

const router = express.Router();
const experienceService = new ExperienceService();

// GET /api/experiences
router.get('/', async (req, res) => {
    try {
        const experiences = await experienceService.getAllExperiences();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/experiences/:id
router.get('/:id', async (req, res) => {
    try {
        const experience = await experienceService.getExperienceById(req.params.id);
        res.json(experience);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/experiences
router.post('/', async (req, res) => {
    try {
        const newExperience = await experienceService.createExperience(req.body);
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/experiences/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await experienceService.updateExperience(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/experiences/:id
router.delete('/:id', async (req, res) => {
    try {
        await experienceService.deleteExperience(req.params.id);
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;