import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="hero">
                <img
                    src="/hero.avif"
                    alt="Hero background"
                    className="hero-image"
                />
                <div className="hero-content">
                    <h1>Välkommen till My AI Music Search</h1>
                    <p>Hitta dina favoritlåtar och få personliga rekommendationer!</p>
                    <div className="hero-buttons">
                        <button onClick={() => navigate('/login')}>Logga in</button>
                        <button onClick={() => navigate('/register')}>Registrera dig</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
