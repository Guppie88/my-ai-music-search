import express from 'express';
import { registerUser, loginUser, logoutUser, verifyUser } from '../controllers/authController.js';

const router = express.Router();

// Registreringsroute
router.post('/register', registerUser);

// Inloggningsroute
router.post('/login', loginUser);

// Utloggningsroute
router.post('/logout', logoutUser);

// Verifieringsroute
router.get('/verify', verifyUser);

export default router;
