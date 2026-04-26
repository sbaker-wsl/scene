import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export function getUser() {
  const token = cookies().get('token')?.value
  if (!token) return null

  return jwt.verify(token, process.env.JWT_SECRET!)
}