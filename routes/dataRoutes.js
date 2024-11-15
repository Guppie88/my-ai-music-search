import express from 'express';
import { importArtists } from '../controllers/artistController.js';
import { importTracks } from '../controllers/trackController.js';

const router = express.Router();

router.post('/import/artists', importArtists);
router.post('/import/tracks', importTracks);

export default router;
