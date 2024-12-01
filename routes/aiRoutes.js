import express from 'express';
import Track from '../models/trackModel.js';

const router = express.Router();

router.get('/recommendations', async (req, res) => {
    try {
        const { artist, name } = req.query; // Fokusera på artist och namn
        let query = {};

        // Filtrera på artist
        if (artist) {
            query['artists'] = artist;
        }

        // Filtrera på låtnamn
        if (name) {
            query['name'] = { $regex: new RegExp(name, 'i') }; // Case-insensitive sökning
        }

        const recommendations = await Track.find(query)
            .sort({ popularity: -1 })
            .limit(10);

        if (!recommendations.length) {
            return res.status(404).json({ message: 'Inga låtar hittades' });
        }

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Misslyckades att hämta rekommendationer' });
    }
});

export default router;
