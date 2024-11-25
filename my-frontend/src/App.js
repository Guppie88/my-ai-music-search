import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Tracks from './components/Tracks';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Route för Login */}
                <Route path="/" element={<Login />} />

                {/* Skyddad Route */}
                <Route path="/protected" element={<ProtectedRoute />} />

                {/* Route för Tracks */}
                <Route path="/tracks" element={<Tracks />} />
            </Routes>
        </Router>
    );
};

export default App;
