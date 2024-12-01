import express from 'express';
import { getArtists } from '../controllers/artistController.js';

const router = express.Router();

router.get('/', getArtists);

export default router;
