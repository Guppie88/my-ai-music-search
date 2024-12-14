import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService.js';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout();
                alert('Du har loggats ut.');
                navigate('/'); // Omdirigera till Homepage efter utloggning
            } catch (error) {
                console.error('Logout error:', error);
                alert('Utloggning misslyckades.');
            }
        };

        handleLogout();
    }, [navigate]);

    return <div>Loggar ut...</div>;
};

export default Logout;
