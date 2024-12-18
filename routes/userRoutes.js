import express from 'express';
import { requireLogin } from '../middlewares/requireLogin.js';
import User from '../models/userModel.js';

const router = express.Router();

// Hämta användarens profilinformation
router.get('/profile', requireLogin, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        res.status(200).json({
            username: user.username,
            registrationDate: user.registrationDate,
            profileImage: user.profileImage,
        });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ message: 'Misslyckades att hämta användardata', error });
    }
});

// Hämta inloggad användares data
router.get('/me', requireLogin, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Användaren hittades inte' });
        }
        console.log('Fetched User:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Serverfel vid hämtning av användardata' });
    }
});

// Uppdatera användarens profilbild
router.put('/updateProfileImage', requireLogin, async (req, res) => {
    try {
        const { profileImage } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        user.profileImage = profileImage;
        await user.save();

        res.status(200).json({ message: 'Profilbilden har uppdaterats', profileImage: user.profileImage });
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ error: 'Misslyckades att uppdatera profilbild' });
    }
});

export default router;
