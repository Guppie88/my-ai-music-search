import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js'; // AI-relaterade rutter
import Track from './models/trackModel.js'; // Importera Track-modellen

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware för JSON
app.use(express.json());

// Dynamisk CORS-konfiguration
const allowedOrigins = ['http://localhost:8080', 'http://172.28.160.1:8080', 'http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Tillåt cookies och sessionshantering
}));

// Anslutning till MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Statisk mapp för frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/public')));

// API-routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Endpoint för att hämta spår med paginering
app.get('/api/data/tracks', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const tracks = await Track.find()
            .skip(skip)
            .limit(Number(limit))
            .sort({ popularity: -1 });

        const totalTracks = await Track.countDocuments();
        const totalPages = Math.ceil(totalTracks / limit);

        res.status(200).json({
            tracks,
            currentPage: Number(page),
            totalPages,
            totalTracks,
        });
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});

// Rutt för rekommendationer
app.get('/api/recommendations', async (req, res) => {
    try {
        const { artist, name } = req.query;
        let query = {};

        if (artist) query['artists'] = artist;
        if (name) query['name'] = { $regex: new RegExp(name, 'i') }; // Case-insensitive sökning

        const recommendations = await Track.find(query)
            .sort({ popularity: -1 })
            .limit(10);

        if (!recommendations.length) {
            return res.status(404).json({ message: 'Inga låtar hittades' });
        }

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Hantera frontend-rutter (React SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Hantera okända endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
