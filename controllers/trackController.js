import Track from '../models/trackModel.js';
import csv from 'csv-parser';
import fs from 'fs';

export const importTracks = async (req, res) => {
    try {
        const results = [];
        fs.createReadStream('spotify_dataset/tracks.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                await Track.insertMany(results);
                res.status(201).send({ message: 'Tracks imported successfully!' });
            });
    } catch (error) {
        res.status(500).send({ error: 'Failed to import tracks', details: error });
    }
};
