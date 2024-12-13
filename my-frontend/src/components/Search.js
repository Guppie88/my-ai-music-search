import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [nameQuery, setNameQuery] = useState('');
    const [artistQuery, setArtistQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!nameQuery.trim() && !artistQuery.trim()) {
            setError('Please enter a song name or artist.');
            return;
        }

        setLoading(true);
        setError('');
        setResults([]);

        try {
            const queryParams = new URLSearchParams();
            if (nameQuery.trim()) queryParams.append('name', nameQuery.trim());
            if (artistQuery.trim()) queryParams.append('artist', artistQuery.trim());

            const response = await fetch(`/api/search/tracks?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Skicka cookies med förfrågan
            });

            if (response.status === 404) {
                setError('Inga låtar eller artister matchade din sökning.');
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch search results: ${errorText}`);
            }

            const data = await response.json();
            console.log('Search API Response:', data);
            setResults(data.tracks || []);
        } catch (err) {
            setError(err.message);
            console.error('Search Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2>Sök</h2>
            <input
                type="text"
                placeholder="Sök efter låtnamn..."
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                className="search-input"
            />
            <input
                type="text"
                placeholder="Sök efter artist..."
                value={artistQuery}
                onChange={(e) => setArtistQuery(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearch} disabled={loading} className="search-button">
                Sök
            </button>
            {loading && <p>Laddar...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className="search-results">
                {results.map((track) => (
                    <li key={track._id} className="search-result">
                        <strong>{track.name}</strong> - {track.artists?.join(', ')}<br />
                        <span>🕒 {Math.floor(track.duration / 60000)}:{((track.duration % 60000) / 1000).toFixed(0).padStart(2, '0')}</span><br />
                        <span>⭐ Popularitet: {track.popularity}</span><br />
                        <span>📅 Release: {new Date(track.releaseDate).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
