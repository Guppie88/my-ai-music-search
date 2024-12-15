// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Misslyckades att hämta användardata');
                }

                // Kontrollera att svaret är JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error('Oväntat svar från servern');
                }
            } catch (error) {
                console.error('Error fetching user:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div className="user-profile-container"><p>Laddar användaruppgifter...</p></div>;
    }

    if (error) {
        return <div className="user-profile-container"><p className="error">{error}</p></div>;
    }

    return (
        <div className="user-profile-container">
            <h2>Välkommen, {user.username}!</h2>
            <div className="user-info">
                <p><strong>Användarnamn:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Medlem sedan:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="account-actions">
                <button className="update-btn">Uppdatera Profil</button>
                <button className="logout-btn" onClick={handleLogout}>Logga ut</button>
            </div>
        </div>
    );
};

const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Misslyckades att logga ut');
        }

        window.location.href = '/login';
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
};

export default UserProfile;
