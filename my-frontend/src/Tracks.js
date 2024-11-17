import React, { useEffect, useState } from 'react';

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState('');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImlhdCI6MTczMTg0OTAwMywiZXhwIjoxNzM3MDMzMDAzfQ.ZXYwlofoezc981A6F7CQeJwGzue33I1d7CuqnOrG9qI';

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/data/tracks', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch tracks: ${response.statusText}`);
                }

                const data = await response.json();
                setTracks(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTracks();
    }, []);

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    return (
        <div>
            <h2>Tracks</h2>
            {tracks.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {tracks.map((track) => (
                        <li key={track.id}>
                            <strong>{track.name}</strong> by {track.artists.join(', ')} (Popularity: {track.popularity})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Viktigt: Lägg till detta för att exportera komponenten som standard
export default Tracks;
