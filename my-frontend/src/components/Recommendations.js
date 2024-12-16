import React, { useState } from 'react';
import './Recommendations.css';

const Recommendations = ({ socket }) => {
    const [artist, setArtist] = useState('');
    const [name, setName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Sidnummer
    const limit = 10; // Antal rekommendationer per sida

    // Funktion för att spara sökningen i sökhistoriken
    const saveSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/searchHistory/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ artist, name }),
            });

            if (!response.ok) {
                throw new Error('Misslyckades att spara sökhistorik');
            }
        } catch (error) {
            console.error('Error saving search:', error.message);
            setError('Misslyckades att spara sökhistorik');
        }
    };

    // Funktion för att hämta personliga rekommendationer med paginering
    const fetchPersonalRecommendations = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('page', page);
            queryParams.append('limit', limit);

            const response = await fetch(`http://localhost:5000/api/searchHistory/personal?${queryParams}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Misslyckades att hämta personliga rekommendationer');
            }

            setRecommendations(data.tracks || []);
            setError('');
        } catch (error) {
            console.error('Error fetching personal recommendations:', error.message);
            setError(error.message);
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    // Funktion för att hantera sökningen: spara sökningen och hämta personliga rekommendationer
    const handleSearch = async () => {
        await saveSearch();
        await fetchPersonalRecommendations();
    };

    // Funktion för att hämta generella rekommendationer med paginering
    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (artist) queryParams.append('artist', artist);
            if (name) queryParams.append('name', name);
            queryParams.append('page', page);
            queryParams.append('limit', limit);

            const response = await fetch(`http://localhost:5000/api/recommendations?${queryParams}`, {
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Misslyckades att hämta rekommendationer');
            }

            setRecommendations(data);
            setError('');

            // Skicka WebSocket-meddelande efter rekommendation
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ action: 'recommendation', artist, name }));
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error.message);
            setError(error.message);
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendations-container">
            <h2>Rekommendationer</h2>
            <input
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
            />
            <input
                type="text"
                placeholder="Låtnamn"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={fetchRecommendations} disabled={loading}>
                {loading ? 'Laddar...' : 'Hämta rekommendationer'}
            </button>
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Laddar...' : 'Hämta personliga rekommendationer'}
            </button>
            <div className="pagination-buttons">
                <button
                    onClick={() => {
                        setPage((prev) => {
                            const newPage = Math.max(prev - 1, 1);
                            fetchRecommendations();
                            return newPage;
                        });
                    }}
                    disabled={page === 1}
                >
                    Föregående
                </button>
                <span>Sida {page}</span>
                <button
                    onClick={() => {
                        setPage((prev) => {
                            const newPage = prev + 1;
                            fetchRecommendations();
                            return newPage;
                        });
                    }}
                >
                    Nästa
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {recommendations.length > 0 && (
                <ul>
                    {recommendations.map((track) => (
                        <li key={track._id} className="recommendation-item">
                            {track.name} - {track.artists?.join(', ')}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Recommendations;
