import mongoose from 'mongoose';

// Importera din Track-modell
import Track from '../models/Track.js'; // Skapa denna modell om den inte redan finns

// Endpoint för att hämta rekommendationer baserat på genrer
export const getRecommendationsByGenre = async (req, res) => {
    const { genres } = req.body; // Hämta användarens valda genrer från POST-förfrågan

    if (!genres || genres.length === 0) {
        return res.status(400).send({ error: 'No genres provided' });
    }

    try {
        // Hitta låtar i MongoDB som matchar de valda genrerna
        const recommendations = await Track.find({
            genres: { $in: genres }
        }).limit(20); // Begränsa resultat till 20 låtar

        if (recommendations.length === 0) {
            return res.status(404).send({ message: 'No recommendations found' });
        }

        res.status(200).send({ recommendations });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).send({ error: 'Error fetching recommendations' });
    }
};
