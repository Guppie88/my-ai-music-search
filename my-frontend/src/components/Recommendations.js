import React, { useState, useEffect } from 'react';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/recommendations?genre=Pop');
                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }
                const data = await response.json();
                setRecommendations(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRecommendations();
    }, []);

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h1>Rekommenderade låtar</h1>
            <ul>
                {recommendations.map((track) => (
                    <li key={track._id}>
                        {track.name} - {track.artists?.join(', ')} (Popularitet: {track.popularity})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
