import { NextResponse } from "next/server";
import { signToken } from '@/lib/auth';
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne( { email: email } );
        if (!user) {
            return NextResponse.json({ message: "Invalid email" }, { status: 400 });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }
        else {
            const token = signToken({ userId: user._id });
            const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
            res.cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 });
            return res;
        }
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500} );
    }
}