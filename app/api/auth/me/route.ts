import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import User from '@/models/User'

export async function GET() {
  try {
    const tokenStore = await cookies();
    const token = tokenStore.get('token')?.value

    if (!token) {
      return Response.json({ user: null }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return Response.json({ user: null }, { status: 401 })
    }

    return Response.json({ user })

  } catch {
    return Response.json({ user: null }, { status: 401 })
  }
}