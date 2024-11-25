export const loginUser = (req, res) => {
    const { username, password } = req.body;
    if (username === 'demo' && password === 'password') {
        req.session.user = { username };
        res.status(200).json({ message: 'Inloggning lyckades', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Felaktigt användarnamn eller lösenord' });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Misslyckades att logga ut' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Utloggning lyckades' });
    });
};

export const getProtected = (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ message: 'Åtkomst beviljad', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Ej behörig. Logga in.' });
    }
};
