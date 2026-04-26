'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (!data.user) {
        router.replace('/login')
        return
      }

      setUser(data.user)
      setLoading(false);
    } catch (err) {
      router.push('/login')
    }
  }
    loadUser()
  }, [router])

  const handleLogout = async () => {
    await fetch('api/auth/logout', {
      method: 'POST',
    })
    router.replace('/login')
  }

  // make this look nicer
  if (loading) {
    return (
      <div className="text-white text-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="text-center text-white">
      Hello {user?.username}
      Location {user?.location || 'Unknown'}
      Bio {user?.bio || 'No bio set'}
    <Link
      href="/account/edit"
      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Edit Profile
    </Link>
    <button
        onClick={handleLogout}
        className="block mx-auto mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}