import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import searchRoutes from './routes/searchRoutes.js'; // Importera searchRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/data', trackRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/search', searchRoutes); // Lägg till searchRoutes

// Serve static files for the frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'my-frontend/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-frontend/public', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
