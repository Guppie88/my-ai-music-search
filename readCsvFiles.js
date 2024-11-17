import fs from 'fs';
import csvParser from 'csv-parser';

// Filvägar
const artistsFile = './spotify_dataset/artists.csv';
const tracksFile = './spotify_dataset/tracks.csv';

// Funktion för att läsa in en CSV-fil
const readCsvFile = async (filePath, description) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(`${description} data inläst:`);
                console.log(`Antal rader: ${results.length}`);
                console.log(`Första raderna:`, results.slice(0, 5)); // Visa första 5 raderna
                resolve(results);
            })
            .on('error', (error) => {
                console.error(`${description} - Fel vid inläsning:`, error);
                reject(error);
            });
    });
};

// Läs in artists.csv
readCsvFile(artistsFile, 'Artists')
    .then((artistsData) => {
        console.log('Artists analys klar.');
        // Här kan du lägga till kod för att bearbeta artistsData
    })
    .catch((err) => console.error('Fel vid hantering av artists:', err));

// Läs in tracks.csv
readCsvFile(tracksFile, 'Tracks')
    .then((tracksData) => {
        console.log('Tracks analys klar.');
        // Här kan du lägga till kod för att bearbeta tracksData
    })
    .catch((err) => console.error('Fel vid hantering av tracks:', err));
