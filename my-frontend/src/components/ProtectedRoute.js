import React, { useEffect, useState } from 'react';
import { getProtected } from '../session.js'; // Uppdaterad sökväg

const ProtectedRoute = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProtected();
                setData(response);
            } catch (error) {
                console.error('Error fetching protected route:', error);
            }
        };

        fetchData();
    }, []);

    return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
};

export default ProtectedRoute;