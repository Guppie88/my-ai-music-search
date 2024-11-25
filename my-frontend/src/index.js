import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Säkerställ att App.js finns i samma mapp
import './index.css'; // Säkerställ att index.css existerar i samma mapp

const root = ReactDOM.createRoot(document.getElementById('root')); // Säkerställ att 'root' existerar i din public/index.html
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

