import Artist from '../models/artistModel.js';

export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        if (!artists.length) {
            return res.status(404).json({ message: 'Inga artister hittades' });
        }
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Misslyckades att hämta artister', details: error.message });
    }
};
