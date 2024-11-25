import React, { useState } from 'react';
import { login } from '../session'; // Förutsatt att session.js hanterar inloggning

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
                setMessage(response.error || 'Felaktiga inloggningsuppgifter.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Ett fel uppstod vid inloggning.');
        }
    };

    return (
        <div>
            <h2>Logga in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Användarnamn:
                        <input
                            type="text"
                            placeholder="Användarnamn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Lösenord:
                        <input
                            type="password"
                            placeholder="Lösenord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Logga in</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
