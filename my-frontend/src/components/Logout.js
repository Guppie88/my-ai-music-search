import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                if (response.ok) {
                    alert('Du har loggats ut.');
                    navigate('/login'); // Omdirigera till inloggningssidan
                } else {
                    alert('Utloggning misslyckades. Försök igen.');
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('Ett fel uppstod vid utloggning.');
            }
        };

        logout();
    }, [navigate]);

    return <div>Loggar ut...</div>; // Visar ett meddelande under utloggningen
};

export default Logout;
