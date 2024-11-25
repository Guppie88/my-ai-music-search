import React from 'react';
import { logout } from '../session'; // Förutsatt att session.js finns och hanterar API-anrop för sessioner

const Header = () => {
    const handleLogout = async () => {
        try {
            const response = await logout();
            alert(response.message || 'Du har loggats ut.');
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Ett fel uppstod vid utloggning.');
        }
    };

    return (
        <header>
            <h1>AI Music Search</h1>
            <button onClick={handleLogout}>Logga ut</button>
        </header>
    );
};

export default Header;
