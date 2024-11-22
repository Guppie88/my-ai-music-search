import React from 'react';
import { logout } from '../api/session';

const Header = () => {
    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response.message);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return <button onClick={handleLogout}>Logga ut</button>;
};

export default Header;
