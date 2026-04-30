import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Venue from "@/models/Venue";
import "@/models/User";

export async function GET(req: Request, context: any) {
    await connectToDatabase();
    const { params } = context;
    const { id } = await params;

    const venue = await Venue.findById(id).populate("comments.user");

    return NextResponse.json(venue.comments);
}

export async function POST(req: Request, context: any) {
    await connectToDatabase();

    const { params } = context;
    const { id } = await params;

    const tokenStore = await cookies();
    const token = tokenStore.get('token')?.value
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
        return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    const userId = decoded.userId;

    const venue = await Venue.findByIdAndUpdate(id, {
        $push: {
            comments: {
                user: userId,
                text,
            },
        },
    },
    { returnDocument: "after" }
    ).populate('comments.user', 'username');

    return NextResponse.json(venue.comments);
}