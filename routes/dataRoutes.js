import express from 'express';
import { getArtists } from '../controllers/artistController.js'; // Correct import for getArtists
import { getTracks, importTracks, getTracksByGenre } from '../controllers/trackController.js';


const router = express.Router();

// Routes for tracks
router.get('/tracks', getTracks);
router.post('/import/tracks', importTracks);

// Routes for artists
router.get('/artists', getArtists);

export default router;
