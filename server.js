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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URLS = [
    'http://localhost:3000',
    'http://localhost:8080'
];

// Middleware
app.use(express.json());
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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/data', trackRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/search', searchRoutes);

// Serve statiska filer för frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'my-frontend/public')));

// Fallback för att hantera frontend-rutter med React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-frontend/public', 'index.html'));
});

// Starta server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
