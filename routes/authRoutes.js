import express from 'express';
import { loginUser, logoutUser, getProtected } from '../controllers/authController.js';

const router = express.Router();

// Inloggning
router.post('/login', loginUser);

// Utloggning
router.post('/logout', logoutUser);

// Skyddad route
router.get('/protected', getProtected); // Hanterar skyddad åtkomst

export default router;
