// app.js
require('dotenv').config();  // För att ladda miljövariabler från en .env-fil
const express = require('express');
const connectToDatabase = require('./config/db'); // Importera funktionsanropet för databasanslutning
const userRoutes = require('./routes/userRoutes'); // Importera användaroutes

const app = express();
app.use(express.json());

// Anslut till MongoDB
connectToDatabase();

// Använd userRoutes på den angivna slutpunkten
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
