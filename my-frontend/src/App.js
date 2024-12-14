// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Tracks from './components/Tracks.js';
import Recommendations from './components/Recommendations.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Logout from './components/Logout.js';
import Header from './components/Header.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import { isAuthenticated } from './services/authService.js';

const App = () => {
    return (
        <Router>
            <>
                {isAuthenticated() && <Header />} {/* Visa Header endast om användaren är autentiserad */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* Skyddade routes */}
                    <Route element={<ProtectedRoute redirectPath="/login" />}>
                        <Route path="/search" element={<Search />} />
                        <Route path="/tracks" element={<Tracks />} />
                        <Route path="/recommendations" element={<Recommendations />} />
                    </Route>
                </Routes>
            </>
        </Router>
    );
};

export default App;
