import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';

// Importera dina routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import searchHistoryRoutes from './routes/searchHistoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URLS = ['http://localhost:3000', 'http://localhost:8080'];

// Middleware
app.use(express.json({ limit: '50mb' })); // Öka payload-gränsen till 50 MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    credentials: true,
    origin: FRONTEND_URLS,
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 dag
    },
}));

// MongoDB-anslutning
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/data', trackRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/searchHistory', searchHistoryRoutes);

// Serve statiska filer för frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'my-frontend/public')));

// Fallback för att hantera frontend-rutter och undvika att API-förfrågningar returnerar index.html
app.get('*', (req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({ message: 'API-routen hittades inte' });
    }
    res.sendFile(path.join(__dirname, 'my-frontend/public', 'index.html'));
});

// Starta server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
