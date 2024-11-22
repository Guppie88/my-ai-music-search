import Track from '../models/trackModel.js';
import fs from 'fs';
import csvParser from 'csv-parser';

// Get tracks with pagination
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
        res.status(500).json({ error: 'Failed to fetch tracks', details: error.message });
    }
};

// Import tracks from a CSV file
export const importTracks = async (req, res) => {
    const batchSize = 1000;
    let batch = [];
    const csvFilePath = './spotify_dataset/preprocessed_tracks.csv';

    try {
        const stream = fs.createReadStream(csvFilePath).pipe(csvParser());

        stream
            .on('data', (data) => {
                if (!data.name || !data.id || !data.duration) {
                    console.warn(`Skipping invalid row: ${JSON.stringify(data)}`);
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
