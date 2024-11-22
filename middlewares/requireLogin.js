const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        next(); // Fortsätt om användaren är inloggad
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
};

export default requireLogin;
