import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Track from './models/trackModel.js'; // Importera Track-modellen

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware för JSON och CORS
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'], // Tillåt båda frontend-portarna
    credentials: true // Tillåt cookies och sessionshantering
}));

// Redis-konfiguration
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const store = new RedisStore({
    client: redisClient
});

app.use(session({
    store,
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 dag
    }
}));

// MongoDB-anslutning
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Login-endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'demo' && password === 'password') { // Demo-uppgifter
        req.session.user = { username };
        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Logout-endpoint
app.post('/logout', (req, res) => {
    if (req.session) {
        // Försök ta bort sessionen
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ error: 'Failed to logout' });
            } else {
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } else {
        res.status(400).json({ error: 'No active session to logout' });
    }
});

// Endpoint för att hämta spår med paginering
app.get('/api/data/tracks', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Standardvärden om de inte skickas
        const skip = (page - 1) * limit; // Räkna ut hur många poster som ska hoppas över

        const tracks = await Track.find()
            .skip(skip)
            .limit(Number(limit))
            .sort({ popularity: -1 }); // Sortera efter popularitet (störst först)

        const totalTracks = await Track.countDocuments();
        const totalPages = Math.ceil(totalTracks / limit);

        res.status(200).json({
            tracks,
            currentPage: Number(page),
            totalPages,
            totalTracks
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});

// Ny rekommendationsrutt
app.get('/api/recommendations', async (req, res) => {
    try {
        const { genre = 'Pop' } = req.query; // Standardgenre
        const recommendations = await Track.find({ genre })
            .sort({ popularity: -1 })
            .limit(10);

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Hantera okända endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Starta servern
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
