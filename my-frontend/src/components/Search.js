import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [nameQuery, setNameQuery] = useState('');
    const [artistQuery, setArtistQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Funktion för att spara sökningen i sökhistoriken
    const saveSearch = async (tracks) => {
        try {
            console.log('Saving search with tracks:', tracks);
            console.log('Saving search with artist:', artistQuery);
            console.log('Saving search with name:', nameQuery);

            const response = await fetch('http://localhost:5000/api/searchHistory/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ tracks, artist: artistQuery, name: nameQuery }),
            });

            if (!response.ok) {
                throw new Error('Misslyckades att spara sökhistorik');
            }

            console.log('Search successfully saved to history');
        } catch (err) {
            console.error('Error saving search:', err.message);
        }
    };

    // Funktion för att hantera sökningen
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

            console.log('Fetching search results with params:', queryParams.toString());

            const response = await fetch(`/api/search/tracks?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch search results: ${errorText}`);
            }

            const data = await response.json();
            console.log('Search API Response:', data);
            setResults(data.tracks || []);

            // Spara sökningen i sökhistoriken efter en lyckad sökning
            await saveSearch(data.tracks);
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
