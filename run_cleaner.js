const { exec } = require('child_process');

// Kör Python-skriptet
const scriptPath = './scripts/clean_tracks.py';

exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Körning misslyckades: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Felmeddelande: ${stderr}`);
        return;
    }

    console.log(`Utdata:\n${stdout}`);
});
