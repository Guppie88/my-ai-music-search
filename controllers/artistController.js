import Artist from '../models/artistModel.js';
import csv from 'csv-parser';
import fs from 'fs';

export const importArtists = async (req, res) => {
    try {
        const results = [];
        fs.createReadStream('spotify_dataset/artists.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                await Artist.insertMany(results);
                res.status(201).send({ message: 'Artists imported successfully!' });
            });
    } catch (error) {
        res.status(500).send({ error: 'Failed to import artists', details: error });
    }
};
