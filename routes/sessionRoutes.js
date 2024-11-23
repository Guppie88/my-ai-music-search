import express from 'express';

const router = express.Router();

// Inloggningsroute
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'demo' && password === 'password') {
        req.session.user = { username };
        res.status(200).json({ message: 'Inloggning lyckades', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Felaktigt användarnamn eller lösenord' });
    }
});

// Skyddad route
router.get('/protected', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ message: 'Åtkomst beviljad', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Ej behörig. Logga in.' });
    }
});

export default router;
