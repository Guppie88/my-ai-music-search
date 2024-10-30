import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbUri)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Avsluta om anslutningen misslyckas
    });
