import jwt from 'jsonwebtoken';

export const requireLogin = (req, res, next) => {
    const token = req.cookies.session_id;

    if (!token) {
        console.error('No token found in cookies');
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('User authenticated:', decoded);
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};
