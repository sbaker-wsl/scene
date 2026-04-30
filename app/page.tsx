'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ─────────────────────────────────────────────

interface Venue {
  _id: string;
  artist: string;
  genre: string;
  location: string;
  date: string;
}

// ─── Helpers ───────────────────────────────────────────

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.toLocaleDateString()} · ${d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

// ─── Event Card ────────────────────────────────────────

function EventCard({ venue }: { venue: Venue }) {
  return (
    <div className="min-w-[240px] bg-zinc-900 border border-zinc-700 rounded-2xl p-4">
      <p className="text-xs text-blue-400 mb-2">
        {formatDate(venue.date)}
      </p>

      <p className="text-sm font-semibold text-white">
        {venue.artist}
      </p>

      <p className="text-xs text-zinc-400 mb-3">
        {venue.location}
      </p>

      <span className="text-xs px-2 py-1 rounded bg-purple-900/40 text-purple-300">
        {venue.genre}
      </span>
    </div>
  );
}

// ─── HomePage ──────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchVenues = async () => {
      const res = await fetch('/api/venues');
      const data = await res.json();
      setVenues(data);
      setLoading(false);
    };

    fetchVenues();
  }, []);

  // Derived data
  const now = new Date();

  const upcoming = venues
    .filter(v => new Date(v.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recent = [...venues]
    .reverse()
    .slice(0, 10);

  const genres = Array.from(new Set(venues.map(v => v.genre)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <body className="bg-black min-h-screen flex flex-col px-6 py-8 space-y-10">
    <main className="flex-1">

      {/* 🔥 Happening Soon */}
      <section>
        <h2 className="text-white text-xl font-bold mb-4">
          Happening Soon
        </h2>

        <div className="flex gap-4 overflow-x-auto">
          {upcoming.slice(0, 10).map(v => (
            <EventCard key={v._id} venue={v} />
          ))}
        </div>
      </section>

      {/* 🆕 Recently Added */}
      <section>
        <h2 className="text-white text-xl font-bold mb-4">
          Recently Added
        </h2>

        <div className="flex gap-4 overflow-x-auto">
          {recent.map(v => (
            <EventCard key={v._id} venue={v} />
          ))}
        </div>
      </section>

      {/* 🎵 Browse by Genre */}
      <section>
        <h2 className="text-white text-xl font-bold mb-4">
          Browse by Genre
        </h2>

        <div className="flex flex-wrap gap-3">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => router.push(`/search?q=${g}`)}
              className="px-4 py-2 rounded-full bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition"
            >
              {g}
            </button>
          ))}
        </div>
      </section>

    </main>
    </body>
  );
}