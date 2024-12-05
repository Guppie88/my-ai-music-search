import Track from '../models/trackModel.js';

export const getRecommendations = async (req, res) => {
    try {
        const { artist, name } = req.query;
        let query = {};

        if (artist) query['artists'] = { $regex: new RegExp(artist, 'i') };
        if (name) query['name'] = { $regex: new RegExp(name, 'i') };

        console.log('Generated query:', query); // Debug-logg

        const recommendations = await Track.find(query).sort({ popularity: -1 }).limit(10);

        console.log('Fetched recommendations:', recommendations); // Debug-logg

        if (!Array.isArray(recommendations) || recommendations.length === 0) {
            return res.status(404).json({ message: 'Inga rekommendationer hittades' });
        }

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Misslyckades att hämta rekommendationer' });
    }
};
