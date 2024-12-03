import express from 'express';
import { createNewUser } from '../controllers/userController.js';

const router = express.Router();

// Registreringsrutt
router.post('/register', createNewUser);

export default router;
