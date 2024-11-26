import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Se till att filen heter App.js
import './index.css'; // CSS-styling för projektet

const root = ReactDOM.createRoot(document.getElementById('root')); // 'root' måste existera i index.html
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
