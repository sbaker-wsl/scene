import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import User from '@/models/User'

export async function POST(req: Request) {
  const body = await req.json()

  const tokenStore = await cookies();
  const token = tokenStore.get('token')?.value
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  await User.findByIdAndUpdate(decoded.userId, {
    bio: body.bio,
    location: body.location,
  })

  return Response.json({ success: true })
}