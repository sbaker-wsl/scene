import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    const tokenStore = await cookies();
    tokenStore.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    })

    return NextResponse.json({ success: true })
}