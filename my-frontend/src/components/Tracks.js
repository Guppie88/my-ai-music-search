// src/components/Tracks.js
import React, { useEffect, useState } from 'react';
import './Tracks.css';

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
            const response = await fetch(`http://localhost:5000/api/data/tracks?page=${page}&limit=10`);
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
        <div className="tracks-container">
            <h2 className="tracks-title">Tracks</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <div>
                    <ul className="tracks-list">
                        {tracks.map((track) => (
                            <li key={track._id} className="track-item">
                                <strong>{track.name}</strong> - {track.artists?.join(', ')}{' '}
                                <span className="track-popularity">(Popularity: {track.popularity})</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination">
                        <button
                            className="pagination-button"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="pagination-info">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="pagination-button"
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
