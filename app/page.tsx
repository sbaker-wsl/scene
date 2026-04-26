'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleProfileClick = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (data.user) {
        router.push('/dashboard');
      } else {
        router.replace('/login');
      }
    } catch (err) {
      alert(err || 'Error checking authentication');
      router.push('/login');
    }
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
    <main className = "relative bg-black min-h-screen px-6 py-8">
      {/* User icon - top right */}
      <button
        onClick={handleProfileClick}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
      >
        <svg
          className="w-7 h-7 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto space-y-10">

        {/*Trending Section */}
        <section className = "space-y-4">
          <h2 className = "text-white text-xl font-bold"> Trending</h2>

          <div className = "flex gap-4 overflow-x-auto pb-2">
            {/* Event Cards Placeholder */}
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </section>

        {/* Happening Soon Section */}
        <section className = "space-y-4">
          <h2 className = "text-white text-xl font-bold"> Happening Soon</h2>

          <div className = "flex gap-4 overflow-x-auto pb-2">
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </section>

        {/* Featured Artists Section */}
        <section className = "space-y-4">
          <h2 className = "text-white text-xl font-bold">Featured Artists</h2>

          <div className = "flex gap-4 overflow-x-auto pb-2">
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
            <div className = "min-w-[250px] h-[200px] bg-zinc-800 rounded-xl animate-pulse" />
          </div>
        </section>

      </div>
    </main>
  );
}