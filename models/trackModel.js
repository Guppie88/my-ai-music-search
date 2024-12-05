import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artists: { type: [String], required: true },
    popularity: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    releaseDate: { type: Date, default: null },
    explicit: { type: Boolean, default: false },
});

const Track = mongoose.model('Track', trackSchema);

export default Track;
