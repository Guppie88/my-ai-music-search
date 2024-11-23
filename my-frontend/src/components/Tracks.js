import React, { useEffect, useState } from 'react';

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data/tracks?page=1&limit=10', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Misslyckades att hämta data: ${response.statusText}`);
                }

                const data = await response.json();
                setTracks(data.tracks || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    if (loading) return <p>Laddar...</p>;
    if (error) return <p style={{ color: 'red' }}>Fel: {error}</p>;

    return (
        <div>
            <h1>Tracks</h1>
            {tracks.length === 0 ? (
                <p>Inga tracks tillgängliga.</p>
            ) : (
                <ul>
                    {tracks.map((track) => (
                        <li key={track.id}>
                            {track.name} - {track.artists && track.artists.join(', ')} (Popularitet: {track.popularity})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Tracks;
