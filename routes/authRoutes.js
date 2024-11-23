import express from 'express';
import { loginUser, logoutUser, getProtected } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/protected', getProtected);

export default router;
