import express from 'express';
import dotenv from 'dotenv';
import * as userRoutes from './routes/userRoutes.js';
import authRoutes from './auth/authRoutes.js'; // Importera auth-rutter

dotenv.config();

const app = express();
app.use(express.json());

// Använd autentiseringsrutter
app.use('/auth', authRoutes); // Exempel: /auth/register

// Använd användarrutter
app.use('/users', userRoutes.router);  // Notera användningen av .router här

// Exportera appen för tester
export default app;

