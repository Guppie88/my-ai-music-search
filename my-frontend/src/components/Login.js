import React, { useState, useEffect } from 'react';
import { login } from '../services/authService.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Rensa formulärfälten vid inladdning
    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            setMessage(`Välkommen, ${response.user.username}`);
            navigate('/tracks'); // Navigera till Tracks efter lyckad inloggning
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Logga in</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button type="submit">Logga in</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
