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

export default mongoose.models.Venue || mongoose.model("Venue", venueSchema);