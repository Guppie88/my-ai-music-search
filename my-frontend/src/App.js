import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js'; // Säkerställ att alla .js-explicita tillägg finns
import Login from './components/Login.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Tracks from './components/Tracks.js';
import Recommendations from './components/Recommendations.js';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/protected" element={<ProtectedRoute />} />
                <Route path="/tracks" element={<Tracks />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
    );
};

export default App;
