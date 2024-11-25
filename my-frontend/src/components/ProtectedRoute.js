import React, { useEffect, useState } from 'react';
import { getProtected } from '../session'; // Förutsatt att session.js hanterar skyddade anrop

const ProtectedRoute = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProtected();
                setData(response);
            } catch (error) {
                console.error('Error fetching protected data:', error);
                setError('Ett fel uppstod vid hämtning av data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Laddar...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Skyddad Sida</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ProtectedRoute;
