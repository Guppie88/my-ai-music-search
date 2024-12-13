import React, { useState } from 'react';
import './Recommendations.css';

const Recommendations = ({ socket }) => {
    const [artist, setArtist] = useState('');
    const [name, setName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (artist) queryParams.append('artist', artist);
            if (name) queryParams.append('name', name);

            const response = await fetch(`/api/recommendations?${queryParams}`, {
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
