import React, { useEffect, useState } from 'react';

const Tracks = () => {
    const [tracks, setTracks] = useState([]); // Lista med tracks
    const [error, setError] = useState(''); // Felmeddelande
    const [loading, setLoading] = useState(false); // Laddningsstatus
    const [page, setPage] = useState(1); // Aktuell sida
    const [totalPages, setTotalPages] = useState(0); // Totalt antal sidor

    const fetchTracks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/data/tracks?page=${page}&limit=10`);
            if (!response.ok) {
                throw new Error(`Failed to fetch tracks: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched Tracks:', data); // Debugging
            setTracks(data.tracks || []);
            setTotalPages(data.pages || 1); // Använd "pages" från API
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTracks();
    }, [page]); // Anropa `fetchTracks` när `page` ändras

    return (
        <div>
            <h2>Tracks</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <ul>
                        {tracks.map((track) => (
                            <li key={track._id}>
                                {track.name} - {track.artists?.join(', ')} (Popularity: {track.popularity})
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tracks;
