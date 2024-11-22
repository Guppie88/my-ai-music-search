import React, { useState } from 'react';
import { login } from '../api/session';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response.user) {
                setMessage(`Welcome, ${response.user.username}`);
            } else {
                setMessage(response.error);
            }
        } catch (error) {
            setMessage('An error occurred while logging in.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Logga in</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
