// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
    return (
        <nav className="navbar">
            <Link to="/">Hem</Link>
            <Link to="/search">Sök</Link>
            <Link to="/tracks">Tracks</Link>
            <Link to="/recommendations">Rekommendationer</Link>
            {isAuthenticated && <Link to="/profile">Min Profil</Link>}
            {isAuthenticated && <Link to="/logout">Logga ut</Link>}
            {!isAuthenticated && <Link to="/login">Logga in</Link>}
        </nav>
    );
};

export default Navbar;
