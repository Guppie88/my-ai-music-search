// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Tracks from './components/Tracks.js';
import Recommendations from './components/Recommendations.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Logout from './components/Logout.js';
import Header from './components/Header.js';
import UserProfile from './components/UserProfile.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import InfoPage from './components/InfoPage.js';

const App = () => {
    return (
        <Router>
            <Header />
            <nav>
                <Link to="/info">Information och Policys</Link> {/* Länk till informationssidan */}
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/info" element={<InfoPage />} /> {/* Route för informationssidan */}

                {/* Skyddade routes */}
                <Route element={<ProtectedRoute redirectPath="/login" />}>
                    <Route path="/search" element={<Search />} />
                    <Route path="/tracks" element={<Tracks />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/profile" element={<UserProfile />} /> {/* Skyddad profilsida */}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
