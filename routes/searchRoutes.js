import express from 'express';
import { searchTracks } from '../controllers/searchController.js';

const router = express.Router();

// Route för att söka efter låtar
router.get('/tracks', searchTracks);

export default router;
