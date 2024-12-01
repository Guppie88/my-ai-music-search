import Artist from '../models/artistModel.js';

export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        if (!artists.length) {
            return res.status(404).json({ message: 'No artists found' });
        }
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch artists', details: error.message });
    }
};
