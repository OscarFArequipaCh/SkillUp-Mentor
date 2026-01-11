import express from 'express';
import { CertificateService } from '../service/certificateService.js';

const router = express.Router();
const certificateService = new CertificateService();

// GET /api/certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificates();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/certificates/:id
router.get('/:id', async (req, res) => {
  try {
    const certificate = await certificateService.getCertificateById(req.params.id);
    res.json(certificate);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/certificates
router.post('/', async (req, res) => {
  try {
    const newCertificate = await certificateService.createCertificate(req.body);
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/certificates/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedCertificate = await certificateService.updateCertificate(req.params.id, req.body);
    res.json(updatedCertificate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/certificates/:id
router.delete('/:id', async (req, res) => {
  try {
    await certificateService.deleteCertificate(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;