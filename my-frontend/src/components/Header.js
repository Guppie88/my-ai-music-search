import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (!response.ok) throw new Error('Logout failed');

            alert('Du har loggats ut.');
            navigate('/login'); // Omdirigera till login efter utloggning
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header>
            <h1>My AI Music Search</h1>
            <button onClick={handleLogout}>Logga ut</button>
        </header>
    );
};

export default Header;
