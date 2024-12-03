import User from '../models/userModel.js';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Alla fält är obligatoriska' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Fel användarnamn eller lösenord' });
        }

        res.status(200).json({ message: 'Inloggning lyckades', user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Serverfel vid inloggning' });
    }
};

export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Utloggning lyckades' });
};
