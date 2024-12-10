import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
            if (response.ok) {
                alert('Du har loggats ut.');
                navigate('/login');
            } else {
                alert('Utloggning misslyckades. Försök igen.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Ett fel uppstod vid utloggning.');
        }
    };

    return (
        <header style={{ padding: '10px', background: '#007bff', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>My AI Music Search</h1>
            <nav>
                <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/search" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Search</Link>
                <Link to="/tracks" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Tracks</Link>
                <Link to="/recommendations" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Recommendations</Link>
                <Link to="/login" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Login</Link>
                <Link to="/register" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Register</Link>
                <button onClick={handleLogout} style={{ marginLeft: '10px', padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;
