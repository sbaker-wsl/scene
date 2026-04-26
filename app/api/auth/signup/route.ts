import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  try {

    await connectToDatabase();

    const { username, email, password, location, bio } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const passwordAcceptable = password && password.length >= 6;
    if (!passwordAcceptable) {
      return NextResponse.json({ message: "Password must be at least 6 characters, and whitespace is unacceptable" }, { status: 400 });
    }

    // add logic for email handling!

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location,
      bio,
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
} catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}