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
    contact: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v: string) => /^[0-9\-+() ]+$/.test(v),
            message: "Invalid phone number format",
        },
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        set: (v: number) => parseFloat(v.toFixed(2)),
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
                maxLength: 500,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// this ensures that you cannot insert 2 documents with the same artist + location + date
venueSchema.index(
    { artist: 1, location: 1, date: 1},
    { unique: true }
);

export default mongoose.models.Venue || mongoose.model("Venue", venueSchema);