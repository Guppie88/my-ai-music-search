// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { register } from '../services/authService.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Rensa formulärfälten vid inladdning och när man lämnar sidan
    useEffect(() => {
        setUsername('');
        setEmail('');
        setPassword('');

        return () => {
            setUsername('');
            setEmail('');
            setPassword('');
        };
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            setMessage('Registrering lyckades! Du omdirigeras till inloggningssidan...');
            setUsername('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/login'); // Navigera till inloggningssidan efter 2 sekunder
            }, 2000);
        } catch (error) {
            console.error('Register error:', error);
            setMessage(error.message || 'Registrering misslyckades');
        }
    };

    return (
        <div>
            <h2>Registrera dig</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrera</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
