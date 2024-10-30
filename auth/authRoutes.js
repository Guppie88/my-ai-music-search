import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registreringsroute
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Hasha lösenordet innan det sparas
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error creating user' });
    }
});

// Inloggningsroute
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ error: 'User not found' });

        // Jämför lösenordet med det hashade lösenordet i databasen
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send({ error: 'Invalid password' });

        // Skapa JWT-token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ error: 'Error logging in' });
    }
});

export default router;
