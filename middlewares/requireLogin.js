import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Ladda miljövariabler från .env-filen

const app = express();
const PORT = 5000;

// Middleware för JSON
app.use(express.json());

// Anslut till Redis
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET, // Använd hemlig nyckel från .env
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Sätt till `true` i produktion med HTTPS
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 dag
        },
    })
);

// Middleware för att kontrollera inloggning
const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
};

// Inloggningsroute
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'demo' && password === 'password') {
        req.session.user = { username }; // Spara användare i session
        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Skyddad route
app.get('/protected', requireLogin, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.session.user });
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
