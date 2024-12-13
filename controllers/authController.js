import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { v4 as uuidv4 } from 'uuid';

// Registreringsfunktion
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Alla fält är obligatoriska' });
    }

    try {
        // Kontrollera om användaren redan finns
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-postadressen används redan' });
        }

        // Hasha lösenordet
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashat lösenord vid registrering:', hashedPassword);

        // Skapa en ny användare med ett genererat UUID för id
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

// Inloggningsfunktion
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Användarnamn och lösenord krävs' });
    }

    try {
        // Hitta användaren i databasen
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Ogiltiga inloggningsuppgifter' });
        }

        console.log('Angett lösenord:', password);
        console.log('Hashat lösenord i databasen:', user.password);

        // Jämför lösenordet med det hashade lösenordet i databasen
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Lösenordsjämförelse resultat:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ error: 'Ogiltiga inloggningsuppgifter' });
        }

        // Skapa JWT-token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Sätt en cookie med JWT-token
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

// Utloggningsfunktion
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('session_id');
        res.status(200).json({ message: 'Utloggning lyckades' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Utloggning misslyckades' });
    }
};
