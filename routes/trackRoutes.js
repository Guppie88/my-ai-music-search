import express from 'express';
import { getTracks, importTracks } from '../controllers/trackController.js';

const router = express.Router();

// Rutt för att hämta tracks
router.get('/tracks', getTracks);

// Placeholder-rutt för import
router.post('/tracks/import', importTracks);

export default router;
