
'use client'

export default async function DashboardPage() {
    const res = await fetch('/api/auth/me')
    const data = await res.json()

    return (
        <div className = "text-center">
            <div className = "text-white">
                Hello {data.user}!
            </div>
        </div>
    );
}