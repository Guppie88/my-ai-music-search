// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService.js';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            alert('Du har loggats ut.');
            navigate('/'); // Omdirigera till startsidan efter utloggning
        } catch (error) {
            console.error('Logout error:', error);
            alert('Utloggning misslyckades.');
        }
    };

    return (
        <header className="header">
            <h1 className="logo">My AI Music Search</h1>
            <nav className="nav-links">
                <Link to="/">Hem</Link>
                <Link to="/search">Sök</Link>
                <Link to="/tracks">Tracks</Link>
                <Link to="/recommendations">Rekommendationer</Link>
                <Link to="/profile">Min Profil</Link>
                <button className="logout-btn" onClick={handleLogout}>Logga ut</button>
            </nav>
        </header>
    );
};

export default Header;
