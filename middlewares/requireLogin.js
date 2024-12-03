export const requireLogin = (req, res, next) => {
    console.log('Session vid skyddad route:', req.session); // Logga sessionen för felsökning
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
};
