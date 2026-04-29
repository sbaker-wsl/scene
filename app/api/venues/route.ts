import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Venue from "@/models/Venue";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        
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