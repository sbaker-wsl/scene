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

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-6">
        
        {/* Animated SVG Spinner */}
        <div className="w-16 h-16">
          <svg
            className="animate-spin"
            viewBox="0 0 50 50"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-700"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="90 150"
              strokeDashoffset="0"
              className="text-blue-500"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-white text-lg font-medium tracking-wide">
            Loading your account
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Just a moment...
          </p>
        </div>

      </div>
    </div>
  )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white">
            {user?.username}
          </h1>
          <p className="text-gray-400 text-sm">Your Account</p>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-left">
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white font-medium">
              {user?.location || 'Unknown'}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Bio</p>
            <p className="text-white font-medium">
              {user?.bio || 'No bio set'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/account/edit"
            className="w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
          >
            Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
          >
            Sign Out
          </button>
        </div>

      </div>
    </div>
  )
}