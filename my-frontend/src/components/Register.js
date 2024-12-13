import React, { useState } from 'react';
import { register } from '../services/authService.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            setMessage('Registrering lyckades! Du omdirigeras till inloggningssidan...');
            setTimeout(() => {
                navigate('/login'); // Navigera till inloggningssidan efter 2 sekunder
            }, 2000);
        } catch (error) {
            setMessage(error.message);
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
