import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/data/tracks?page=1&limit=10&name=${query}`);
            const data = await response.json();

            if (response.ok) {
                setResults(data.tracks);
            } else {
                console.error('Error fetching tracks:', data.error);
            }
        } catch (error) {
            console.error('Search error:', error);
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
            <button onClick={handleSearch} className="search-button">Sök</button>
            {loading && <p>Laddar...</p>}
            <ul className="search-results">
                {results.map((track) => (
                    <li key={track._id} className="search-result">
                        <strong>{track.name}</strong> - {track.artists.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
