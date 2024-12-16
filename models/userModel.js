// src/models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    profileImage: { type: String, default: '' }, // Profilbild lagras som en data-URL
    searchHistory: [
        {
            artist: { type: String },
            name: { type: String },
            searchedAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
