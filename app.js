import express from 'express';
import dotenv from 'dotenv';
import * as userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Lägg till dina rutter
app.use('/users', userRoutes.router);  // Notera användningen av .router här

// Exportera appen för tester
export default app;
