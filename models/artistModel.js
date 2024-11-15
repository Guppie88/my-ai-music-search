import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    genres: { type: [String], default: [] },
    popularity: { type: Number, default: 0 },
    followers: { type: Number, default: 0 }
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
