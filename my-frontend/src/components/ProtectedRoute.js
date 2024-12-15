// src/components/ProtectedRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService.js';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setAuth(result);
        };

        checkAuth();
    }, []);

    if (auth === null) {
        return <div>Laddar...</div>; // Visar en laddningsindikator medan autentiseringen kontrolleras
    }

    return auth ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
