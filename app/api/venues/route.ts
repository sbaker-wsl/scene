import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Venue from "@/models/Venue";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();

        const { artist, genre, location, date } = body;

        // probably want more error handling here, for sure need a check for dupes before adding it
        
        if (!artist || !genre || !location || !date) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        
        const venue = await Venue.create(body);

        return NextResponse.json(venue, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Failed to create venue" }, { status: 500 });
    }
}

export async function GET() {
    await connectToDatabase();

    // sorts by ascending date
    const venues = await Venue.find().sort( { date: 1 });

    return NextResponse.json(venues);
}

export async function GETFILTER(req: Request) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    let filter = {};

    if (query) {
        filter = {
            $or: [
                { artist: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" }},
            ],
        };
    }

    const venues = await Venue.find(filter).sort( { date: 1 });

    return NextResponse.json(venues);
}