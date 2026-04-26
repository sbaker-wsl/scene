'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  return (
    <div className="text-center text-white">
      Hello {user?.name}
    </div>
  )
}