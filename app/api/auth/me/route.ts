import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tokenStore = await cookies();
    const token = tokenStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    return NextResponse.json({ user })

  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}