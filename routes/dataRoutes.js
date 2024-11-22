import express from 'express';
import { getTracks, importTracks } from '../controllers/trackController.js';

const router = express.Router();

router.get('/tracks', getTracks); // Hämta tracks
router.post('/import/tracks', importTracks); // Importera tracks

export default router;
