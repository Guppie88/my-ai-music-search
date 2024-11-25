import Track from '../models/trackModel.js';

export const getTracks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const tracks = await Track.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Track.countDocuments();

        res.status(200).json({
            tracks,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ error: 'Misslyckades att hämta låtar', details: error.message });
    }
};

export const importTracks = async (req, res) => {
    // Importera låtar från CSV-logik här (som tidigare delad)
};
