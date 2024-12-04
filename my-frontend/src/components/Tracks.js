import React, { useEffect, useState } from 'react';

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTracks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/data/tracks?page=${page}&limit=10`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch tracks: ${response.statusText}`);
                }

                const data = await response.json();
                setTracks(data.tracks || []);
                setTotalPages(data.pages || 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, [page]);

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    if (loading) return <p>Laddar...</p>;
    if (error) return <p style={{ color: 'red' }}>Fel: {error}</p>;

    return (
        <div>
            <h2>Tracks</h2>
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
            <div>
                <button onClick={handlePrevious} disabled={page === 1}>
                    Föregående
                </button>
                <span>
                    Sida {page} av {totalPages}
                </span>
                <button onClick={handleNext} disabled={page === totalPages}>
                    Nästa
                </button>
            </div>
        </div>
    );
};

export default Tracks;
