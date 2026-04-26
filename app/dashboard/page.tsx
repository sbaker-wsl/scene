'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (!data.user) {
        router.push('/login')
        return
      }

      setUser(data.user)
    } catch (err) {
      router.push('/login')
    }
  }
    loadUser()
  }, [router])

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
    </div>
  )
}