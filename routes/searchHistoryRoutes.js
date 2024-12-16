import express from 'express';
import User from '../models/userModel.js';
import { requireLogin } from '../middlewares/requireLogin.js';
import Track from '../models/trackModel.js'; // Se till att denna import finns

const router = express.Router();

// Endpoint för att spara tracks och sökförfrågningar i sökhistoriken
router.post('/save', requireLogin, async (req, res) => {
    try {
        const userId = req.user.id;
        const { tracks, artist, name } = req.body;

        console.log('Request payload size:', JSON.stringify({ tracks, artist, name }).length, 'bytes');

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        if (tracks && tracks.length > 0) {
            tracks.forEach((track) => {
                console.log('Saving track:', track.name, 'by', track.artists.join(', '));
                user.searchHistory.push({ artist: track.artists.join(', '), name: track.name });
            });
        } else {
            console.log('Saving search query:', artist, name);
            user.searchHistory.push({ artist, name });
        }

        await user.save();
        res.status(200).json({ message: 'Sökningen sparades i sökhistoriken' });
    } catch (error) {
        console.error('Error saving search history:', error);
        res.status(500).json({ error: `Misslyckades att spara sökhistorik: ${error.message}` });
    }
});

// Endpoint för att hämta personliga rekommendationer med paginering
router.get('/personal', requireLogin, async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const user = await User.findById(userId);

        if (!user || !user.searchHistory.length) {
            console.log('No search history found for user:', userId);
            return res.status(404).json({ message: 'Ingen sökhistorik hittades' });
        }

        console.log('User search history:', user.searchHistory);

        const recentSearches = user.searchHistory.slice(-5).reverse();

        const searchQueries = recentSearches.map((search) => {
            let query = {};
            if (search.artist) query['artists'] = { $regex: new RegExp(search.artist, 'i') };
            if (search.name) query['name'] = { $regex: new RegExp(search.name, 'i') };
            return query;
        });

        console.log('Search queries for recommendations:', searchQueries);

        const recommendations = await Track.find({ $or: searchQueries })
            .sort({ popularity: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        console.log('Recommendations being sent:', recommendations);

        if (!recommendations.length) {
            return res.status(404).json({ message: 'Inga personliga rekommendationer hittades' });
        }

        res.status(200).json({ tracks: recommendations });
    } catch (error) {
        console.error('Error fetching personal recommendations:', error);
        res.status(500).json({ error: `Misslyckades att hämta personliga rekommendationer: ${error.message}` });
    }
});

export default router;
