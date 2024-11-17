import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, default: null },
    popularity: { type: Number, default: 0 },
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
