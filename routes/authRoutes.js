import express from 'express';
import { loginUser, logoutUser, getProtected } from '../controllers/authController.js';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', logoutUser);

// Protected route example
router.get('/protected', getProtected);

export default router;
