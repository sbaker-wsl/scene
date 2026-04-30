import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true,
    },
    // JS Date also includes time
    date: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
});

// this ensures that you cannot insert 2 documents with the same artist + location + date
venueSchema.index(
    { artist: 1, location: 1, date: 1},
    { unique: true }
);

export default mongoose.models.Venue || mongoose.model("Venue", venueSchema);