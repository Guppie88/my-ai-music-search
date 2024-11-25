import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Importera routes
import trackRoutes from './routes/trackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware för att hantera JSON och CORS
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Anslut till Redis
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const store = new RedisStore({
    client: redisClient
});

// Konfigurera sessioner
app.use(session({
    store: store,
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 dag
    }
}));

// Anslut till MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/data', trackRoutes);

// Hantera 404
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Starta servern
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
