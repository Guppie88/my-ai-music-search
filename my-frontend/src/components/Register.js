import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!formData.username || !formData.email || !formData.password) {
            return setMessage('Alla fält är obligatoriska.');
        }

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Misslyckades att registrera användare');
            }

            setMessage('Registreringen lyckades! Du kan nu logga in.');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Registrera dig</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Användarnamn"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-post"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Lösenord"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrera</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
