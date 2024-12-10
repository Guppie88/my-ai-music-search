import Track from '../models/trackModel.js';

export const searchTracks = async (req, res) => {
    try {
        const { name, artist } = req.query;
        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (artist) {
            query.artists = { $regex: artist, $options: 'i' };
        }

        const tracks = await Track.find(query);

        if (tracks.length === 0) {
            return res.status(404).json({ message: 'Inga låtar eller artister matchade din sökning.' });
        }

        res.status(200).json({ tracks });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Ett fel uppstod vid sökning.', error: error.message });
    }
};
