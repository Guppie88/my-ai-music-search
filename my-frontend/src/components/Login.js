import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../session.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password); // Använd login-funktionen
            setMessage(`Välkommen, ${response.user.username}`);
            navigate('/tracks'); // Navigera till Tracks efter lyckad inloggning
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Logga in</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Logga in</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
