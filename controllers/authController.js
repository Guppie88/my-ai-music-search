// authController.js

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (username === 'demo' && password === 'password') {
        req.session.user = { username }; // Spara användare i sessionen
        res.status(200).json({ message: 'Inloggning lyckades', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Felaktigt användarnamn eller lösenord' });
    }
};

export const logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ error: 'Misslyckades att logga ut' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Utloggning lyckades' });
        });
    } else {
        res.status(400).json({ error: 'Ingen aktiv session att logga ut från' });
    }
};

export const getProtected = (req, res) => {
    console.log('Cookies:', req.cookies); // För att inspektera cookies
    console.log('Session:', req.session); // För att inspektera session

    if (req.session && req.session.user) {
        res.status(200).json({ message: 'Access granted', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
};
