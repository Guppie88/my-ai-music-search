import Track from '../models/trackModel.js';

// Hämta tracks med paginering och sortering
export const getTracks = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (page <= 0 || limit <= 0) {
        return res.status(400).json({ error: 'Page och limit måste vara större än 0' });
    }

    try {
        // Hämta tracks från databasen
        const tracks = await Track.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ popularity: -1 });

        // Beräkna totalantal och antal sidor
        const total = await Track.countDocuments();
        const pages = Math.ceil(total / limit);

        // Skicka svar
        res.status(200).json({ tracks, total, page, pages });
    } catch (error) {
        console.error('Error fetching tracks:', error.message);
        res.status(500).json({ error: 'Misslyckades att hämta låtar', details: error.message });
    }
};

// Importera tracks från en fil (Placeholder)
export const importTracks = async (req, res) => {
    // Placeholder för CSV-import
    res.status(501).json({ message: 'Importfunktion inte implementerad ännu' });
};
