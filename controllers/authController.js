export const loginUser = (req, res) => {
    const { username, password } = req.body;
    if (username === 'demo' && password === 'password') {
        req.session.user = { username }; // Spara användaren i session
        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Ta bort sessionscookie
        res.status(200).json({ message: 'Logout successful' });
    });
};

export const getProtected = (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ message: 'Access granted', user: req.session.user });
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
};
