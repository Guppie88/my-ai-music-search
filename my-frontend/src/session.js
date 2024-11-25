const API_BASE_URL = 'http://localhost:5000'; // Bas-URL för API

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Login error:', error.message || error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Logout failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Logout error:', error.message || error);
        throw error;
    }
};

export const getProtected = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/protected`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to access protected route: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Protected route error:', error.message || error);
        throw error;
    }
};
