const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Registreringsfunktion
export const register = async (username, email, password) => {
    try {
        console.log('Skickar registreringsförfrågan med:', { username, email, password });

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log('Registreringssvar från servern:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Registrering misslyckades');
        }

        return data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

// Inloggningsfunktion
export const login = async (username, password) => {
    try {
        console.log('Skickar inloggningsförfrågan med:', { username, password });

        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Skickar cookies med begäran
        });

        const data = await response.json();
        console.log('Svar från servern:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Inloggning misslyckades');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Utloggningsfunktion
export const logout = async () => {
    try {
        console.log('Skickar utloggningsförfrågan');

        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include', // Skickar cookies med begäran
        });

        const data = await response.json();
        console.log('Utloggningssvar från servern:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Utloggning misslyckades');
        }

        return data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
