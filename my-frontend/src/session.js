const API_URL = '/api'; // Proxy hanterar att dirigera förfrågningar till backend

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
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
