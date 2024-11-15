import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    album: { type: String, default: '' },
    artists: { type: [String], default: [] },
    duration_ms: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 },
    danceability: { type: Number, default: 0 },
    energy: { type: Number, default: 0 }
});

const Track = mongoose.model('Track', trackSchema);

export default Track;
