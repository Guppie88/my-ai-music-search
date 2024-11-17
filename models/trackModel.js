import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    popularity: { type: Number, default: 0 },
    explicit: { type: Boolean, default: false },
    releaseDate: { type: Date, default: null },
    artists: { type: [String], default: [] },
});

const Track = mongoose.model('Track', trackSchema);

export default Track;
