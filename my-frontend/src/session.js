const API_URL = 'http://localhost:5000'; // Centralisera bas-URL för enkel hantering

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Viktigt för sessionshantering
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json(); // Returnera JSON-data från servern
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

export const getProtected = async () => {
    try {
        const response = await fetch(`${API_URL}/protected`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch protected route');
        }

        return await response.json();
    } catch (error) {
        console.error('Protected route error:', error);
        throw error;
    }
};