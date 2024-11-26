import React, { useState } from 'react';
import { login } from '../session.js'; // Importera korrekt

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response.user) {
                setMessage(`Välkommen, ${response.user.username}`);
            } else {
                setMessage(response.error || 'Inloggning misslyckades.');
            }
        } catch (error) {
            setMessage('Ett fel uppstod vid inloggning.');
            console.error('Login error:', error);
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
