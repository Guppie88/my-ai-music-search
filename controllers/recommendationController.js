import Track from '../models/trackModel.js';

export const getRecommendations = async (req, res) => {
    try {
        const { artist, name } = req.query;
        let query = {};

        if (artist) query['artists'] = artist;
        if (name) query['name'] = { $regex: new RegExp(name, 'i') };

        const recommendations = await Track.find(query)
            .sort({ popularity: -1 })
            .limit(10);

        if (!recommendations.length) {
            return res.status(404).json({ message: 'Inga rekommendationer hittades' });
        }

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Misslyckades att hämta rekommendationer' });
    }
};
