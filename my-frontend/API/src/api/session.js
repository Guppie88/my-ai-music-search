export const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Skicka sessions-cookies
            body: JSON.stringify({ username, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include', // Skicka sessions-cookies
        });
        return await response.json();
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
