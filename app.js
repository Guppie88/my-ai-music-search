const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  // Kontrollera att denna väg är korrekt

require('dotenv').config();  // Ladda miljövariabler från .env

const app = express();
app.use(express.json());

// Anslut till MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Lägg till dina rutter
app.use('/users', userRoutes);

// Exportera appen för tester
module.exports = app;
