
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Tracks from './components/Tracks.js';
import Recommendations from './components/Recommendations.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Header from './components/Header.js'; // Importera Header med korrekt extension

const App = () => {
    return (
        <Router>
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/tracks" element={<Tracks />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </>
        </Router>
    );
};

export default App;
