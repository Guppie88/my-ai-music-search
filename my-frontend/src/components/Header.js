import React from 'react';
import { logout } from '../session'; // Direkt från src/session.js

const Header = () => {
    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response.message); // Visa meddelande vid lyckad utloggning
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return <button onClick={handleLogout}>Logga ut</button>;
};

export default Header;
