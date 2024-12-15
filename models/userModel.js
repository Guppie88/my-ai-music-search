import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    searchHistory: [
        {
            artist: { type: String },
            name: { type: String },
            searchedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
