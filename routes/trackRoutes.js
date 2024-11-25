import express from 'express';
import { getTracks, importTracks } from '../controllers/trackController.js';

const router = express.Router();

// Hämta låtar med pagination
router.get('/tracks', getTracks);

// Importera låtar från CSV
router.post('/import/tracks', importTracks);

export default router;
