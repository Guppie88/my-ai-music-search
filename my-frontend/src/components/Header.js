import React from 'react';
import { logout } from '../session.js'; // Uppdaterad sökväg

const Header = () => {
    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response.message); // Visa meddelande vid lyckad utloggning
            alert('Du har loggats ut.'); // Visa ett meddelande om utloggning
            window.location.href = '/'; // Omdirigera till inloggningssidan
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Ett fel inträffade vid utloggning.'); // Visa ett felmeddelande om utloggning misslyckades
        }
    };

    return <button onClick={handleLogout}>Logga ut</button>;
};

export default Header;
