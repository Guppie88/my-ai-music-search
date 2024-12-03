import User from '../models/userModel.js';

export const createNewUser = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Alla fält är obligatoriska' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-postadressen används redan' });
        }

        const newUser = new User({ username, password, email });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Användare skapad', user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Misslyckades att skapa användare' });
    }
};
