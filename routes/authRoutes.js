import express from 'express';
import { registerUser, loginUser, logoutUser, verifyUser } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registreringsroute
router.post('/register', registerUser);

// Inloggningsroute
router.post('/login', loginUser);

// Utloggningsroute
router.post('/logout', logoutUser);

// Verifieringsroute
router.get('/verify', (req, res) => {
    try {
        const token = req.cookies.session_id;

        if (!token) {
            return res.status(401).json({ error: 'Ingen token tillgänglig' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Ogiltig token' });
            }

            res.status(200).json({ message: 'Användaren är autentiserad', user: decoded });
        });
    } catch (error) {
        console.error('Verifieringsfel:', error);
        res.status(500).json({ error: 'Serverfel vid verifiering' });
    }
});

export default router;
