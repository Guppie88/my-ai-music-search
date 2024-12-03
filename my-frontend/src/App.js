import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js'; // Se till att filändelsen är med
import Login from './components/Login.js';
import Tracks from './components/Tracks.js';
import Recommendations from './components/Recommendations.js';
import Register from './components/Register.js';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tracks" element={<Tracks />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
    );
};

export default App;
