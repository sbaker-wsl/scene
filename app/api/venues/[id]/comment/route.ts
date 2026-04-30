import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import Venue from "@/models/Venue";

export async function GET(req: Request, { params }: any) {
    await connectToDatabase();

    const venue = await Venue.findById(params.id).populate("comments.user");

    return NextResponse.json(venue.comments);
}

export async function POST(req: Request, { params }: any) {
    await connectToDatabase();

    const tokenStore = await cookies();
    const token = tokenStore.get('token')?.value
    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    } catch (error) {
        return Response.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
        return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    const userId = decoded.userId;

    const venue = await Venue.findByIdAndUpdate(params.id, {
        $push: {
            comments: {
                user: userId,
                text,
            },
        },
    },
    { new: true }
    ).populate('comments.user', 'username');

    return NextResponse.json(venue);
}