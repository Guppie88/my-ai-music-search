// Header.js
import React from 'react';
import { logout } from '../session.js'; // Korrekt import

const Header = () => {
    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response.message); // Visa meddelande vid lyckad utloggning
            alert('Du har loggats ut.');
            window.location.href = '/'; // Omdirigera till inloggningssidan
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Ett fel inträffade vid utloggning.');
        }
    };

    return <button onClick={handleLogout}>Logga ut</button>;
};

export default Header;
