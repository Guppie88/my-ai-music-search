import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Registrera användare
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Alla fält är obligatoriska' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-postadressen används redan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashat lösenord vid registrering:', hashedPassword);

        const newUser = new User({
            id: uuidv4(),
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Registrering lyckades!' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Serverfel vid registrering' });
    }
};

// Logga in användare
export const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if ((!email && !username) || !password) {
            return res.status(400).json({ error: 'E-post/Användarnamn och lösenord krävs' });
        }

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(401).json({ error: 'Felaktiga inloggningsuppgifter' });
        }

        console.log('Angett lösenord:', password);
        console.log('Hashat lösenord i databasen:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Felaktiga inloggningsuppgifter' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('session_id', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 dag
        });

        res.status(200).json({ message: 'Inloggning lyckades', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Serverfel vid inloggning' });
    }
};

// Logga ut användare
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('session_id');
        res.status(200).json({ message: 'Utloggning lyckades' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Utloggning misslyckades' });
    }
};

// Verifiera användarens autentisering
export const verifyUser = (req, res) => {
    try {
        const token = req.cookies.session_id;

        if (!token) {
            return res.status(401).json({ error: 'Ingen token tillgänglig' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Ogiltig token' });
            }

            res.status(200).json({ message: 'Användaren är autentiserad', user: decoded });
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ error: 'Serverfel vid verifiering' });
    }
};
