import express from 'express';
import Track from '../models/trackModel.js';
import User from '../models/userModel.js';
import { requireLogin } from '../middlewares/requireLogin.js';

const router = express.Router();

// Endpoint för att spara sökningen i sökhistoriken
router.post('/save', requireLogin, async (req, res) => {
    try {
        const userId = req.user.id;
        const { artist, name } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        user.searchHistory.push({ artist, name });
        await user.save();

        res.status(200).json({ message: 'Sökningen sparades i sökhistoriken' });
    } catch (error) {
        console.error('Error saving search history:', error);
        res.status(500).json({ error: 'Misslyckades att spara sökhistorik' });
    }
});

// Endpoint för att hämta personliga rekommendationer baserat på sökhistoriken
router.get('/personal', requireLogin, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user || !user.searchHistory.length) {
            return res.status(404).json({ message: 'Ingen sökhistorik hittades' });
        }

        const recentSearches = user.searchHistory.slice(-5).reverse();

        const searchQueries = recentSearches.map((search) => {
            let query = {};
            if (search.artist) query['artists'] = search.artist;
            if (search.name) query['name'] = { $regex: new RegExp(search.name, 'i') };
            return query;
        });

        const recommendations = await Track.find({ $or: searchQueries })
            .sort({ popularity: -1 })
            .limit(10);

        if (!recommendations.length) {
            return res.status(404).json({ message: 'Inga personliga rekommendationer hittades' });
        }

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching personal recommendations:', error);
        res.status(500).json({ error: 'Misslyckades att hämta personliga rekommendationer' });
    }
});

export default router;
