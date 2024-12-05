import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) {
            setError('Please enter a search query.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/data/tracks?name=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            console.log('Search API Response:', data); // För debugging
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
            <input
                type="text"
                placeholder="Sök låtar eller artister..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
                        <strong>{track.name}</strong> - {track.artists?.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
