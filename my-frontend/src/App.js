import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Login from './components/Login.js'; // Inloggningskomponent
import ProtectedRoute from './components/ProtectedRoute.js';
import Tracks from './components/Tracks.js';
import Recommendations from './components/Recommendations.js';
import './Recommendations.css'; // Importera CSS-filen direkt från src

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Huvudrutt för inloggning */}
                <Route path="/" element={<Login />} />

                {/* Skyddad rutt */}
                <Route path="/protected" element={<ProtectedRoute />} />

                {/* Tracks */}
                <Route path="/tracks" element={<Tracks />} />

                {/* Rekommendationer */}
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
    );
};

export default App;
