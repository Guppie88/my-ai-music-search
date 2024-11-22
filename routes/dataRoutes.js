import express from 'express';
import { getTracks, importTracks } from '../controllers/trackController.js';

const router = express.Router();

router.get('/tracks', getTracks);
router.post('/import/tracks', importTracks);

export default router;
