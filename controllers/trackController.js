import Track from '../models/trackModel.js';
import fs from 'fs';
import csvParser from 'csv-parser';

// Get all tracks
export const getTracks = async (req, res) => {
    try {
        const tracks = await Track.find();
        if (!tracks.length) {
            return res.status(404).json({ message: 'No tracks found' });
        }
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracks', details: error.message });
    }
};

// Import tracks
export const importTracks = async (req, res) => {
    const batchSize = 1000;
    let batch = [];
    const csvFilePath = './spotify_dataset/preprocessed_tracks.csv';

    try {
        const stream = fs.createReadStream(csvFilePath).pipe(csvParser());

        stream
            .on('data', (data) => {
                if (!data.name || !data.id || !data.duration) {
                    console.error(`Skipping invalid row: ${JSON.stringify(data)}`);
                    return;
                }

                batch.push({
                    id: data.id,
                    name: data.name,
                    duration: parseInt(data.duration, 10),
                    popularity: parseInt(data.popularity || 0, 10),
                    explicit: data.explicit === '1',
                    releaseDate: data.release_date || null,
                    artists: data.artists ? JSON.parse(data.artists) : [],
                });

                if (batch.length === batchSize) {
                    stream.pause();
                    Track.insertMany(batch)
                        .then(() => {
                            console.log(`Inserted ${batch.length} tracks`);
                            batch = [];
                            stream.resume();
                        })
                        .catch((error) => {
                            console.error('Batch insertion error:', error.message);
                            stream.resume();
                        });
                }
            })
            .on('end', async () => {
                if (batch.length > 0) {
                    try {
                        await Track.insertMany(batch);
                        console.log(`Inserted remaining ${batch.length} tracks`);
                    } catch (error) {
                        console.error('Final batch insertion error:', error.message);
                    }
                }
                res.status(201).send({ message: 'Tracks imported successfully!' });
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error.message);
                res.status(500).send({ error: 'Failed to process file', details: error.message });
            });
    } catch (error) {
        res.status(500).json({ error: 'Failed to import tracks', details: error.message });
    }
};
// Get tracks by genre
export const getTracksByGenre = async (req, res) => {
    const genres = req.query.genres ? req.query.genres.split(',') : [];
    try {
        const tracks = await Track.find({ genre: { $in: genres } });
        if (!tracks.length) {
            return res.status(404).json({ message: 'No tracks found for the given genres' });
        }
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracks by genre', details: error.message });
    }
};
