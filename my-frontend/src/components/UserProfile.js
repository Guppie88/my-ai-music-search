import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || '#007bff');
    const [error, setError] = useState('');

    useEffect(() => {
        // Hämta användardata vid sidladdning
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Misslyckades att hämta användarprofil');
                }

                setUsername(data.username);
                setRegistrationDate(new Date(data.registrationDate).toLocaleDateString());
                setProfileImage(data.profileImage);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    // Funktion för att hantera profilbilds-uppladdning
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/updateProfileImage', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ profileImage: reader.result }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Misslyckades att uppdatera profilbild');
                }

                setProfileImage(reader.result);
            } catch (error) {
                console.error('Error updating profile image:', error.message);
                setError(error.message);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Funktion för att ändra tema
    const handleThemeChange = (event) => {
        const color = event.target.value;
        setThemeColor(color);
        localStorage.setItem('themeColor', color);
    };

    return (
        <div className="profile-container" style={{ backgroundColor: themeColor }}>
            <h1>Min Profil</h1>
            <div className="profile-card">
                <div className="profile-image">
                    {profileImage ? (
                        <img src={profileImage} alt="Profilbild" />
                    ) : (
                        <div className="placeholder">Ingen bild</div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                <h2>Välkommen, {username}!</h2>
                <p>Medlemskap sedan: {registrationDate}</p>
                <div className="theme-section">
                    <label>Välj temafärg:</label>
                    <input type="color" value={themeColor} onChange={handleThemeChange} />
                </div>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default UserProfile;
