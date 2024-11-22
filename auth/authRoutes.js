import express from 'express';
import { getArtists } from '../controllers/artistController.js';
import { getTracks, importTracks } from '../controllers/trackController.js';
import authenticateToken from '../middleware/authMiddleware.js'; // Lägg till autentisering

const router = express.Router();

// Routes for tracks
router.get('/tracks', authenticateToken, getTracks); // Skydda endpoint
router.post('/import/tracks', authenticateToken, importTracks);

// Routes for artists
router.get('/artists', authenticateToken, getArtists);

export default router;
