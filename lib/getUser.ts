import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value
    if (!token) return null

    return jwt.verify(token, process.env.JWT_SECRET)
}