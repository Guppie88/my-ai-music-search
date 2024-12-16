// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('Användare');
    const [registrationDate, setRegistrationDate] = useState('');
    const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || '#007bff');
    const [uploadProgress, setUploadProgress] = useState(0);

    // Hämta användarens data vid inläsning av komponenten
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Misslyckades att hämta användardata');
                }

                const data = await response.json();
                setUsername(data.username);
                setRegistrationDate(new Date(data.registrationDate).toLocaleDateString());
                setProfileImage(data.profileImage);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    // Funktion för att hantera profilbilds-uppladdning med progress bar
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadstart = () => setUploadProgress(0);

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percentComplete);
            }
        };

        reader.onloadend = async () => {
            setProfileImage(reader.result);
            setUploadProgress(100);

            try {
                await fetch('http://localhost:5000/api/users/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ profileImage: reader.result }),
                });
            } catch (error) {
                console.error('Error updating profile image:', error.message);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
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
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                    )}
                </div>
                <h2>Välkommen, {username}!</h2>
                <p>Medlemskap: <strong>Medlem</strong></p>
                <p>Medlem sedan: <strong>{registrationDate}</strong></p>
                <label>Välj temafärg:</label>
                <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
            </div>
        </div>
    );
};

export default UserProfile;
